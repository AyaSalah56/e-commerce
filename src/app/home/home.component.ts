import { CartService } from './../cart.service';
import { Category } from './../product';
import { ToastrService } from 'ngx-toastr';
import { CategorySlide } from './../category';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ProductsService } from '../products.service';
import { product } from '../product';
import { CategoriesService } from '../categories.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { WishlestService } from '../wishlest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: product[] = [];
  categories: CategorySlide[] = [];
  term:string = ""
  wishData:string[] = []
  constructor(private _ProductsService: ProductsService, private _CategoriesService: CategoriesService, private _CartService: CartService, private _ToastrService: ToastrService, private _Renderer2: Renderer2 , private _WishlestService:WishlestService) { }

  ngOnInit(): void {
    localStorage.setItem("currentBage", "/home");
    this._ProductsService.getproduct().subscribe({
      next: (res) => {
        this.products = res.data;
      }
    })

    this._CategoriesService.getCategories().subscribe({
      next: (res) => {
        // console.log(res.data);
        this.categories = res.data;
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


  categoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 7000,
    autoplaySpeed: 1000,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: false
  }

  mainSlideOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplaySpeed: 1000,
    nav: false
  }



  addProductToCart(id: string, element: HTMLButtonElement): void {
    
    this._Renderer2.setAttribute(element, 'disabled', 'true');
    this._CartService.addToCart(id).subscribe({
      next: (res) => {
        console.log(res.message);
        this._ToastrService.success(res.message)
        this._Renderer2.removeAttribute(element, 'disabled');
        this._CartService.cartNumber.next(res.numOfCartItems) ;
      },
      error: (err) => {
        console.log(err.message);
        this._ToastrService.error(err.message)
        this._Renderer2.removeAttribute(element, 'disabled');
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

