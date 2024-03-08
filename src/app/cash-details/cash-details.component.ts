import { CartService } from './../cart.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../payment.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-cash-details',
  templateUrl: './cash-details.component.html',
  styleUrls: ['./cash-details.component.scss']
})
export class CashDetailsComponent implements OnInit {
  cartId: string | null = '';
  

  constructor(private _ActivatedRoute: ActivatedRoute, private _PaymentService: PaymentService, private _CartService: CartService , private _ToastrService:ToastrService , private _Router:Router) { };
  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.cartId = params.get('id');
      }
    })
  }

  orderForm: FormGroup = new FormGroup({
    details: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^(01)[0125][0-9]{8}$/)]),
    city: new FormControl('', [Validators.required]),
  })

  cashForm() {
    this._PaymentService.cashPayment(this.cartId, this.orderForm.value).subscribe({
      next: (res) => {
        console.log(res);
        if(res.status == 'success')
        {
          this._ToastrService.success('your checkOut is done');
          this._CartService.cartNumber.next(0);
          this._Router.navigate(['/allOrders' ]);
        }
      }
    })

    
    this._PaymentService.getUserOrder().subscribe({
      next:(res)=>
      {
        console.log(res);
        
      }
    })

  }



}
