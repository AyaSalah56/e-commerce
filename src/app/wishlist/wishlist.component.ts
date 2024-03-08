import { Component, OnInit, Renderer2 } from '@angular/core';
import { WishlestService } from '../wishlest.service';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  wishlistDetails:any = null;
  wishlist:string[] = [];
  constructor(private _WishlestService: WishlestService, private _Renderer2: Renderer2, private _CartService: CartService, private _ToastrService: ToastrService) { }

  ngOnInit(): void {

    this._WishlestService.getUserWishlist().subscribe({
      next: (res) => {
        console.log(res.data);
        this.wishlistDetails = res.data;
      }
    })
  }


  removeItem(id: string) {
    this._WishlestService.removeItemFromWishlist(id).subscribe({
      next: (res) => {
        // console.log(res);
        this._ToastrService.success(res.message)
        this.wishlist = res.data;
        const newListData = this.wishlistDetails.filter((item:any)=> this.wishlist.includes(item._id))
        this.wishlistDetails = newListData
        console.log(Number(this.wishlistDetails.length));
        
        
         this._WishlestService.wishlistNumber.next(this.wishlistDetails.length)
        // this._CartService.cartNumber.next(res.numOfCartItems)
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


}
