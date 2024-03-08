import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WishlestService {

  baseURL:string = "https://ecommerce.routemisr.com" ;
  wishlistNumber:BehaviorSubject<number> = new BehaviorSubject(0) ;

  constructor(private _HttpClient:HttpClient) { }

  AddProductToWishlist(prodId:string):Observable<any>
  {
     return this._HttpClient.post(`${this.baseURL}/api/v1/wishlist`, 
     {
      productId: prodId
     }
     )
  }

  getUserWishlist():Observable<any>
  {
     return this._HttpClient.get(`${this.baseURL}/api/v1/wishlist`)
  }

  removeItemFromWishlist( prodId:string|undefined):Observable<any>
  {
     return this._HttpClient.delete(`${this.baseURL}/api/v1/wishlist/${prodId}`)
  }

}
