import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';
  // Validation messages parameters : two fields email & password
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };

  dummy_response = {
    email: 'user@email.com',
    password: 'password'
  };

  toast: any;

  constructor(private navCtrl: NavController,
              private authService: AuthenticationService,
              private formBuilder: FormBuilder,
              public toastController: ToastController) { }

  // Same function that login.ts
  ngOnInit() { 
    this.validations_form = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30)
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      confirmPassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10)
      ])),
    }, {
      validators: this.passwordConfirm.bind(this)
    });
  }

  passwordConfirm(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmPassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  loginUser(value) {
    console.log(value);
    this.authService.loginUser(value);
    this.showToast('Welcome to the homepage');
  }

  logoutUser() {
    this.authService.logoutUser();
  }

  // Tot show toast after login
  showToast(message: string) {
    this.toast = this.toastController.create({
      message: message,
      duration: 4000
    }).then((toastData)=>{
      console.log(toastData);
      toastData.present();
    });
  }

  // To dismiss toast
  HideToast(){
    this.toast = this.toastController.dismiss();
  }

}
