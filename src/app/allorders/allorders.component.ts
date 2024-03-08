import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../payment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.scss']
})
export class AllordersComponent implements OnInit {
  cartId:string|null = '' ;
  allOrders:any = [];
  constructor(private _PaymentService:PaymentService , private _ActivatedRoute:ActivatedRoute){}
  ngOnInit(): void {
    this._PaymentService.getUserOrder().subscribe({
      next:(res)=>{
       console.log(res);
       this.allOrders = res;
      },
      error:(err)=>{console.log(err)},
    })
  }


}
