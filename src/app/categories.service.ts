import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  BaseUrl:string = `https://ecommerce.routemisr.com`
  constructor(private _HttpClient:HttpClient) { }

  // bta3t el home & category component
 getCategories():Observable<any>
 {
    return this._HttpClient.get(`${this.BaseUrl}/api/v1/categories`)
 }


 getSpecCategory(id:string|null):Observable<any>
 {
     return this._HttpClient.get(`${this.BaseUrl}/api/v1/categories/${id}`)
 }


}
