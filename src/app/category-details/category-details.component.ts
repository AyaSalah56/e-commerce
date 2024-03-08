import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { ActivatedRoute } from '@angular/router';
import { CategorySlide } from '../category';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit {
  catDetailsId:string|null = "" ;
  categoryDetails:CategorySlide = {}
  constructor( private _CategoriesService:CategoriesService , private _ActivatedRoute:ActivatedRoute){}

  ngOnInit(): void {
   
    this._ActivatedRoute.paramMap.subscribe({
      next:(p) =>
      {
          this.catDetailsId = p.get('id')
          console.log(this.catDetailsId);
      }
    })


    this._CategoriesService.getSpecCategory(this.catDetailsId).subscribe({
      next:(res) => 
      {
        console.log(res);
        this.categoryDetails = res.data ;
      }
    })
    
  }

}
