import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  BaseUrl:string = `https://ecommerce.routemisr.com` ;
 
  cartNumber:BehaviorSubject<number> = new BehaviorSubject(0) ;

  constructor( private _HttpClient:HttpClient) { }

  addToCart(prodId:string):Observable<any>
  {
    return this._HttpClient.post(`${this.BaseUrl}/api/v1/cart` , 

    {
      productId: prodId 
    }

   
    
    )
  }

  getUserCart():Observable<any>
  {
     return this._HttpClient.get(`${this.BaseUrl}/api/v1/cart`
     )
  }

  
  removeItemCart( prodId:string):Observable<any>
  {
     return this._HttpClient.delete(`${this.BaseUrl}/api/v1/cart/${prodId}` 
     
     )
  }


  updateCart(prodId:string , countNum:number):Observable<any>
  {
    return this._HttpClient.put(`${this.BaseUrl}/api/v1/cart/${prodId}`, 
    {
      count : countNum
    }
    
    )
  }


  clearCart():Observable<any>
  {
     return this._HttpClient.delete(`${this.BaseUrl}/api/v1/cart` 
    )
  }


  checkOut(cartId:string|null , orderInfo:object):Observable<any>
  {
    return this._HttpClient.post(`${this.BaseUrl}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200` , 
    
    {
      shippingAddress:orderInfo ,
    }
   
    )
  }

}
