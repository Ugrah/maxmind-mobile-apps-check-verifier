import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  spinner = false;
  validations_form: FormGroup;
  errorMessage: string = '';
  // Validation messages parameters : two fields email & password
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ]
  };

  constructor(private formBuilder: FormBuilder,
              private toastService: ToastService) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    });
  }

  /**
  * // TODO: comment sendResetPasswordEmail
  * Send email to reset password
  * @param value
  * @returns USER_DATA
  */
  sendResetPasswordEmail(value) {
    this.spinner = true;
    setTimeout(() => {
      this.validations_form.reset();
      this.spinner = false;
      this.toastService.showToast('The password reset email was sent. Consult your inbox to redefine your password.')
    }, 5000);
  }

}
