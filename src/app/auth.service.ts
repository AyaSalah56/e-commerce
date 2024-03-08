import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AcountDataInterface } from './acount-data-interface';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userDatavar:BehaviorSubject<any> = new BehaviorSubject(null) ;
  userId:string = '';

  baseURL:string = "https://ecommerce.routemisr.com" ;

  constructor(private _HttpClient:HttpClient , private _Router:Router)
   {
       if(localStorage.getItem("currentBage"))
       {
          _Router.navigate([localStorage.getItem("currentBage")]);
       }
   }

  registerAPI (rData :AcountDataInterface):Observable<any>
  {
    return this._HttpClient.post(`${this.baseURL}/api/v1/auth/signup` , rData)
  }

  
  loginAPI (rData :AcountDataInterface):Observable<any>
  {
    return this._HttpClient.post(`${this.baseURL}/api/v1/auth/signin` , rData) ;
  }



  forgetAPI (rData :AcountDataInterface):Observable<any>
  {
    return this._HttpClient.post(`${this.baseURL}/api/v1/auth/forgotPasswords` , rData) ;
  }


  
  verifyAPI(rData :AcountDataInterface):Observable<any>
  {
    return this._HttpClient.post(`${this.baseURL}/api/v1/auth/verifyResetCode` , rData) ;
  }


  newPassAPI(rData :AcountDataInterface):Observable<any>
  {
    return this._HttpClient.put(`${this.baseURL}/api/v1/auth/resetPassword` , rData) ;
  }





  saveDataMethod()
  {
    if(localStorage.getItem("userToken") != null)
    {
      this.userDatavar.next(localStorage.getItem("userToken")) ;
      this.userDatavar.next(jwtDecode(this.userDatavar.getValue()))  ;
      this.userId = this.userDatavar.getValue().id;
      
      // console.log(this.userDatavar);
    }
    else
    {
      this.userDatavar.next(null) ;
    }
  
  }


}
