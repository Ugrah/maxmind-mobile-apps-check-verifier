import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private navCtrl: NavController,
              private authService: AuthenticationService) { }

  canActivate(): boolean {
    if(!this.authService.isAuthenticate()) {
      this.navCtrl.navigateRoot('/welcome');
    }
    return this.authService.isAuthenticate();
  }
}
