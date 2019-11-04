import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toast: any;

  constructor(public toastController: ToastController) { }

  // To show toast after login
  showToast(message: string) {
    this.toastController.dismiss();
    this.toast = this.toastController.create({
      message: message,
      duration: 4000,
      position: 'top',
      color: 'dark'
    }).then((toastData)=>{
      toastData.present();
    });
  }

  // To dismiss toast
  HideToast(){
    this.toast = this.toastController.dismiss();
  }
}
