import { Component, OnInit, Renderer2 } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartDetails: any = null;
  
  constructor(private _CartService: CartService, private _Renderer2: Renderer2) { }
  ngOnInit(): void {

    localStorage.setItem("currentBage", "/cart");

    this._CartService.getUserCart().subscribe({

      next: (res) => {
        // console.log(res.data);
        this.cartDetails = res.data;
      }
    })
  }


  removeItem(id: string, element: HTMLButtonElement) {
    this._Renderer2.setAttribute(element, 'disabled', 'true')
    this._CartService.removeItemCart(id).subscribe({
      next: (res) => {
        // console.log(res);
        this.cartDetails = res.data;
        this._Renderer2.removeAttribute(element, 'disabled');
        this._CartService.cartNumber.next(res.numOfCartItems)
      }
    })
  }

  changeCount(count: number, id: string , min:HTMLButtonElement , plus:HTMLButtonElement) {
    if (count >= 1) {
      this._Renderer2.setAttribute(min , "disabled" , "true")
      this._Renderer2.setAttribute(plus , "disabled" , "true")
      this._CartService.updateCart(id, count).subscribe({
        next: (res) => {
          // console.log(res);
          this.cartDetails = res.data;
          this._Renderer2.removeAttribute(min , "disabled")
          this._Renderer2.removeAttribute(plus , "disabled")
        }
      })
    }

  }

  clear()
  {
    this._CartService.clearCart().subscribe({
      next:(res)=>{
        if(res.message === "success")
        {
          this.cartDetails = null
          this._CartService.cartNumber.next(0)
        }
        
      }
    })
  }
}
