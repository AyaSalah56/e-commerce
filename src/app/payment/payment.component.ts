import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit{

  cartId:string|null = '' ;

  constructor(private _ActivatedRoute:ActivatedRoute , private _CartService:CartService){}
  ngOnInit(): void {
   
    this._ActivatedRoute.paramMap.subscribe({
      next:(params) => {
       this.cartId = params.get('id');
       console.log(this.cartId);
      }
    })
  }

  orderForm: FormGroup = new FormGroup({
    details: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^(01)[0125][0-9]{8}$/)]),
    city: new FormControl('', [Validators.required]),
  })


  handleForm()
  {
    this._CartService.checkOut( this.cartId, this.orderForm.value ).subscribe({
      next:(res) => {
        console.log(res);
        if(res.status == 'success')
        {
            window.open(res.session.url , '_self')
        }
      }
    })
  }

}
