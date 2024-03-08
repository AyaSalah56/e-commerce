import { Component, OnInit, Renderer2 } from '@angular/core';
import { ProductsService } from '../products.service';
import { product } from '../product';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlestService } from '../wishlest.service';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  
  products: product[] = [];
  pageSize:number = 0
  currentPage:number = 1
  total:number=0
  term:string = ""
  wishData:string[] = []
  constructor(private _ProductsService: ProductsService, private _CategoriesService: CategoriesService, private _CartService: CartService, private _ToastrService: ToastrService, private _Renderer2: Renderer2 , private _WishlestService:WishlestService){}

  ngOnInit(): void {
 
    localStorage.setItem("currentBage" , "/products")
    this._ProductsService.getproduct().subscribe({
      next: (res) => {
        this.products = res.data;
        this.pageSize = res.metadata.limit ;
        this.currentPage = res.metadata.currentPage ;
        this.total = res.results;

      }
    })

    this._WishlestService.getUserWishlist().subscribe({
      next:(res)=>
      {
        // console.log(res.data);
        const newData = res.data.map((item:any)=> item._id)
        this.wishData = newData ;
        // console.log(newData);
      }
    })

  }

  addProductToCart(id: string, element: HTMLButtonElement): void {
    
    this._Renderer2.setAttribute(element, 'disabled', 'true');
    this._CartService.addToCart(id).subscribe({
      next: (res) => {
        console.log(res.message);
        this._ToastrService.success(res.message)
        this._Renderer2.removeAttribute(element, 'disabled');
        this._CartService.cartNumber.next(res.numOfCartItems)
      },
      error: (err) => {
        console.log(err.message);
        this._ToastrService.error(err.message)
        this._Renderer2.removeAttribute(element, 'disabled');
      }
    })
  }


  pageChanged(event:any)
  {
    this._ProductsService.getproduct(event).subscribe({
      next: (res) => {
        this.products = res.data;
        this.pageSize = res.metadata.limit ;
        this.currentPage = res.metadata.currentPage ;
        this.total = res.results;

      }
    })
  }


  
  addToWishlist(id:string)
  {
    this._WishlestService.AddProductToWishlist(id).subscribe({
      next:(res) => 
      {
        console.log(res);
        this._ToastrService.success(res.message)
        this.wishData = res.data ;
        this._WishlestService.wishlistNumber.next(this.wishData.length)
      }
    })
  }


  removeFromWishlist(prodId:string)
  {
     this._WishlestService.removeItemFromWishlist(prodId).subscribe({
      next:(res)=>
      {
        console.log(res);
        this._ToastrService.success(res.message)
        this.wishData = res.data ;
        this._WishlestService.wishlistNumber.next(this.wishData.length)
      }
     })
  }


}
