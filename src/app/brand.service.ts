import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
 
  baseurl:string = "https://ecommerce.routemisr.com"
  constructor(private _HttpClient:HttpClient) { }


  getAllBrand():Observable<any>
  {
     return this._HttpClient.get(`${this.baseurl}/api/v1/brands`)
  }


  getSpacificBrandApi(bId:string):Observable<any>{
    return this._HttpClient.get(`${this.baseurl}/api/v1/brands/${bId}`)
  }
}
