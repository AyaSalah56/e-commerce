import { AcountDataInterface } from './../acount-data-interface';
import { Component, Renderer2 } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  errMassage: string = "";
  isloading: boolean = false;
  password: string = '';
  inputType: string = 'password';
  inputreType:string = 'password';

  constructor(private _AuthService: AuthService, private _Router: Router , private _Renderer2:Renderer2) { }

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z].{6}/)]),
    rePassword: new FormControl(null, [Validators.required, Validators.pattern(/^.{6}/)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^(01)[0125][0-9]{8}$/)]),
  }, { validators: [this.confirmPassword] } as FormControlOptions)

  registerSubmitMethod() {
    this.isloading = true;
    this._AuthService.registerAPI(this.registerForm.value).subscribe({
      next: (res) => {
        console.log(res.message);
        this.isloading = false;
        this._Router.navigate(['/login'])
      },

      error: (err) => {
        this.errMassage = err.error.message;
        this.isloading = false;
      }
    })
  }


  confirmPassword(group: FormGroup): void {
    const password = group.get('password');
    const rePassword = group.get('rePassword');
    if (rePassword?.value == '') {
      rePassword?.setErrors({ required: true });
    } else if (password?.value != rePassword?.value) {
      rePassword?.setErrors({ mismatch: true });
    }
  }


  togglePasswordVisibility(input: HTMLInputElement) {
    input.type = (input.type === 'password') ? 'text' : 'password';
    this.inputType = (this.inputType === 'password') ? 'text' : 'password';
  }

  
  togglerePasswordVisibility(input: HTMLInputElement) {
    input.type = (input.type === 'password') ? 'text' : 'password';
    this.inputreType = (this.inputreType === 'password') ? 'text' : 'password';
  }

}
