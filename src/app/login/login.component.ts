import { CartService } from './../cart.service';
import { WishlestService } from './../wishlest.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  errMassage: string = "";
  isloading: boolean = false;
  navNum:number = 0
  wishNum:number =0
  inputType: string = 'password';
  newInputType: string = 'password';

  forgetFlag: boolean = true;
  verifyFlag: boolean = false;
  newPassFlag: boolean = false;
  constructor(private _AuthService: AuthService, private _Router: Router , private _WishlestService:WishlestService , private _CartService:CartService) { }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z].{6}/)]),
  })


  forgetForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  })


  verifyForm: FormGroup = new FormGroup({
    resetCode : new FormControl(null, [Validators.required]),
  })


  newPassForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z].{6}/)]),
  })



  
  loginSubmitMethod() {
    this.isloading = true;
    this._AuthService.loginAPI(this.loginForm.value).subscribe({
      next: (res) => {
        console.log(res);
         this.isloading = false;

         if(res.message == 'success')
         {
            localStorage.setItem("userToken" , res.token) ;
            this._AuthService.saveDataMethod() ;

           

            
            this._WishlestService.getUserWishlist().subscribe
            ({
               next:(res) =>
               {
                this.wishNum = res.data.length;
                this._WishlestService.wishlistNumber.next(this.wishNum)
               }
            })
            
            this._CartService.getUserCart().subscribe
            ({
               next:(res) =>
               {
                this._CartService.cartNumber.next(res.numOfCartItems )
                console.log(res);
                
               }
            })











        
            this._Router.navigate(['/home'])

         }
      },

      error: (err) => {
        console.log(err);
        this.errMassage = err.error.message;
        this.isloading = false;
      }

    })
  }




  forgetSubmitMethod(){
    this.isloading = true;
    this._AuthService.forgetAPI(this.forgetForm.value).subscribe({
      next: (res) => {
        console.log(res);
         this.isloading = false;

         if(res.message)
         {
            console.log("forget tmam");
            this.forgetFlag = false;
           this. verifyFlag = true;
         }
      },

      error: (err) => {
        console.log(err);
        this.errMassage = err.error.message;
        this.isloading = false;
      }

    })
  }





  verifySubmitMethod(){
    this.isloading = true;
    this._AuthService.verifyAPI(this.verifyForm.value).subscribe({
      next: (res) => {
        console.log(res);
         this.isloading = false;

         if(res.status == "Success")
         {
            console.log("verify tmam");
           this. verifyFlag = false;
           this. newPassFlag = true;
         }
      },

      error: (err) => {
        console.log(err);
        this.errMassage = err.error.message;
        this.isloading = false;
      }

    })
  }



  newPassSubmitMethod() {
    this.isloading = true;
    this._AuthService.newPassAPI(this.newPassForm.value).subscribe({
      next: (res) => {
        console.log(res);
         this.isloading = false;

         if(res.token)
         {
            // localStorage.setItem("userToken" , res.token) ;
            // this._AuthService.saveDataMethod() ;
            // this._Router.navigate(['/home'])
             console.log("new pass tmam");
             

         }
      },

      error: (err) => {
        console.log(err);
        this.errMassage = err.error.message;
        this.isloading = false;
      }

    })
  }




  togglePasswordVisibility(input: HTMLInputElement) {
    input.type = (input.type === 'password') ? 'text' : 'password';
    this.inputType = (this.inputType === 'password') ? 'text' : 'password';
  }


  toggleNewPasswordVisibility(input: HTMLInputElement)
  {
    input.type = (input.type === 'password') ? 'text' : 'password';
    this.newInputType = (this.newInputType === 'password') ? 'text' : 'password';
  }




  

}
