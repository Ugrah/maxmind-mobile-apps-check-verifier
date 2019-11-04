import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { NavController } from '@ionic/angular';
import { OcrCameraService } from '../services/ocr-camera.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  constructor(private authService: AuthenticationService,
              private navCtrl: NavController,
              private ocrService: OcrCameraService) {}

  ngOnInit() {
  }

  selectSource() {
    console.log('Your function to show actionSheet to capture or select picture');
  }

}
