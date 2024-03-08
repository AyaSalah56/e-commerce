import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { WishlestService } from '../wishlest.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLogin:boolean = false ;
  navNum:number = 0
  wishNum:number =0

 @ViewChild('navBar') navElement!:ElementRef
 @ViewChild('shoppingIcon') shoppingIconElement!:ElementRef

  @HostListener('window:scroll')
  onscroll()
  {
    if(scrollY > 500)
    {
      this._Renderer2.removeClass(this.navElement.nativeElement , "bg-main-light")
      this._Renderer2.addClass(this.navElement.nativeElement , "bg-main")
      this._Renderer2.removeClass(this.shoppingIconElement.nativeElement , "text-main")
      this._Renderer2.addClass(this.shoppingIconElement.nativeElement , "rating-color")
    }
    else
    {
      this._Renderer2.addClass(this.navElement.nativeElement , "bg-main-light")
      this._Renderer2.removeClass(this.navElement.nativeElement , "bg-main")
      this._Renderer2.addClass(this.shoppingIconElement.nativeElement , "text-main")
      this._Renderer2.removeClass(this.shoppingIconElement.nativeElement , "rating-color")
    }
  }


  constructor(private _AuthService:AuthService ,private _Router:Router , private _CartService:CartService , private _Renderer2:Renderer2, private _WishlestService:WishlestService){}

  ngOnInit(): void {
    
    this._AuthService.userDatavar.subscribe(()=>{
      if(this._AuthService.userDatavar.getValue() == null)
      {
        this.isLogin = false ;
      }
      else
      {
        this.isLogin= true ; 
      }
    })

    this._CartService.cartNumber.subscribe({
      next:(data)=>
      this.navNum = data ,  
    })

    this._WishlestService.wishlistNumber.subscribe({
      next:(data)=>
      this.wishNum = data ,  
    })
    
    this._WishlestService.getUserWishlist().subscribe
    ({
       next:(res) =>
       {
        this.wishNum = res.data.length;
        
       }
    })

    this._CartService.getUserCart().subscribe({
      next:(res)=>
      {
        this.navNum = res.numOfCartItems ;
      }
    })
  }


  logOut()
  {
    localStorage.removeItem("userToken") ;
    this._AuthService.saveDataMethod();
    this._Router.navigate(['./login']) ;
  }

}
