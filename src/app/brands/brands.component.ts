import { Brand } from './../brand';
import { Component, OnInit } from '@angular/core';
import { BrandService } from '../brand.service';
@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

  brandArr:Brand[] = [] ;
  oneBrand:any={}

  constructor(private _BrandService:BrandService){}

  ngOnInit(): void {
 
    localStorage.setItem("currentBage" , "/brands") ;

   this._BrandService.getAllBrand().subscribe({
    next:(res) =>{
      // console.log(res.data);
      this.brandArr = res.data ;
      
    }
   })


  }


  getDetails(pid:string):void
{
  this._BrandService.getSpacificBrandApi(pid).subscribe({
    next:(res)=>{
      this.oneBrand=res.data;
    }
  })

}


}
