import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Platform, ToastController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authState = new BehaviorSubject(false);
  currentUser: any;

  constructor(private navCtrl: NavController,
              private storage: Storage,
              private platform: Platform,
              public toastService: ToastService) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  }

  /**
  * // TODO: comment ifLoggedIn
  * Set authState if User is LoggedIn
  * @returns Void
  */
  ifLoggedIn() {
    this.storage.get('USER_DATA').then((response) => {
      if(response) { this.authState.next(true); console.log('User is authenticate'); }
    });
  }

  /**
  * // TODO: comment loginUser
  * Login User and set USER_DATA inside native storage
  * @param userData
  * @returns Void
  */
  loginUser(userData: any) {
    this.storage.set('USER_DATA', userData).then((response) => {
      this.navCtrl.navigateRoot('');
      this.authState.next(true);
      this.toastService.showToast('Welcome to the home page');
      this.getUserData();
    });
  }

  /**
  * // TODO: comment getUserData
  * Get USER DATA present in native storage
  * @returns USER_DATA
  */
  getUserData() {
    this.storage.get('USER_DATA').then((val) => {
      this.currentUser = val;
      return this.currentUser;
    });
  }

  /**
  * // TODO: comment logoutUser
  * Log out user
  * @returns Void
  */
  logoutUser() {
    this.storage.remove('USER_DATA').then(() => {
      this.navCtrl.navigateRoot('/login')
      this.authState.next(false);
      this.toastService.showToast('User is disconnect !');
      
      // this.storage.set('skipWelcome', true).then((response) => {
      //   this.navCtrl.navigateRoot('login');
      // });
    });
  }

  /**
  * // TODO: comment isAuthenticate
  * Gets authState Value
  * @returns boolean
  */
  isAuthenticate() {
    return this.authState.value;
  }
}
