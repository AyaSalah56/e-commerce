import { product } from './../product';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlestService } from '../wishlest.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  pId:string = "" ; 
  product:any ={};
  wishData:string[] = []

  constructor(private _ActivatedRoute:ActivatedRoute , private _ProductsService:ProductsService, private _Renderer2:Renderer2 , private _CartService:CartService , private _ToastrService:ToastrService ,private _WishlestService:WishlestService){} ;

  ngOnInit(): void {
      this._ActivatedRoute.params.subscribe((p)=>{
        
        this.pId = p["id"] ;
        console.log(this.pId); 

        this._ProductsService.getSpecProduct(this.pId).subscribe({
          next:(res) => {
           this.product = res.data
          } , 
          error:(err) => {console.log(err)} ,
        })
        
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


  ProDetailsOPT: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items:1 ,
    nav: true
  }




}
