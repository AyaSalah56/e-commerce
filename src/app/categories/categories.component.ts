import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { Category } from '../product';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  CategoryData:Category[] = []

  constructor(private _CategoriesService:CategoriesService){}

  ngOnInit(): void {
    localStorage.setItem("currentBage" , "/categories") ;

    this._CategoriesService.getCategories().subscribe({
      next:(res)=>
      {
        console.log(res.data);
        this.CategoryData = res.data ;
      }
    })
  }


}
