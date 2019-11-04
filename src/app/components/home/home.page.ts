import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  currentUser:any;

  constructor(private authService: AuthenticationService,
              private storage: Storage) {}

  ngOnInit() {
    this.getUserData();
  }

  logoutUser() {
    this.authService.logoutUser();
  }

  /**
  * // TODO: comment getUserData
  * Get USER DATA present in native storage and set currentUser of the Class
  * @returns Void
  */
 getUserData() {
    this.storage.get('USER_DATA').then((val) => {
      this.currentUser = val;
    });
  }
}
