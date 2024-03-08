import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  baseurl:string = "https://ecommerce.routemisr.com" ;
  cartId:string|null = '' ;
  userId:string = this._AuthService.userId;

  constructor( private _HttpClient:HttpClient, private _AuthService:AuthService) { }
  
  cashPayment(id:string|null , orderInfo:object):Observable<any>
  {
     return this._HttpClient.post(`${this.baseurl}/api/v1/orders/${id}`,
     {
      shippingAddress:orderInfo ,
     }
    
     )}


  getUserOrder():Observable<any>
  {
    return this._HttpClient.get(`${this.baseurl}/api/v1/orders/user/${this.userId}`)
  }
  }
