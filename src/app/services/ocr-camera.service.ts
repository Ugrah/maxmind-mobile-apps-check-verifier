import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { Subject } from 'rxjs';
import * as Tesseract from 'tesseract.js';



@Injectable({
  providedIn: 'root'
})
export class OcrCameraService implements OnInit, OnDestroy {

  selectedImage: string;
  imageText: string;
  progressBarValue: number;

  selectedImageSubject = new Subject<string>();
  imageTextSubject = new Subject<string>();
  progressBarValueSubject = new Subject<number>();

  /**
   * Add a variable for our tesseract instance.
   */  
  private readonly tesseract;

  constructor(private camera: Camera,
              private actionSheetCtrl: ActionSheetController) {
  }

  ngOnInit(){
    this.selectedImageSubject.subscribe((imagePath: string) => { this.selectedImage = imagePath; });
    this.imageTextSubject.subscribe((text: string) => { this.imageText = text; });
    this.progressBarValueSubject.subscribe((value: number) => { this.progressBarValue = value; });
  }

  /**
  * // TODO: comment selectSource
  * Selected Image source : Library or Capture
  * @returns Void
  */
  selectSource() {
    this.presentCameraActionSheet();
  }

  async presentCameraActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Selecte Source',
      buttons: [
        {
          text: 'Capture Image',
          handler: () => {
            this.getPicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Load From Library',
          handler: () => {
            this.getPicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  /**
  * // TODO: comment getPicture
  * Get a Picture
  * @returns Void
  */
  getPicture(sourceType: PictureSourceType) {
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: sourceType,
      allowEdit: true,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }).then((imageData) => {
      // this.selectedImage = `data:image/jpeg;base64,${imageData}`;
      this.selectedImageSubject.next(`data:image/jpeg;base64,${imageData}`);
      console.log(`data:image/jpeg;base64,${imageData}`);
    });
  }

  /**
  * // TODO: comment recognizeImage
  * Read and recongnize image text
  * @returns Void
  */
  recognizeImage() {
    console.log('Your code to recognize text');

    // Tesseract.recognize('../../assets/dummies/other.png')
    Tesseract.recognize(this.selectedImage)
    .progress(message => {
      if (message.status === 'recognizing text') {
        this.progressBarValueSubject.next(message.progress);
      }
    })
    .then(result => {
      this.imageTextSubject.next(result.text);
    })
    .catch(err => console.error(err))
    .finally(resultOrError => {
      /* this.progress.complete(); */
      console.log(resultOrError);
    });
  }

  ngOnDestroy() {
    this.selectedImageSubject.unsubscribe();
    this.imageTextSubject.unsubscribe();
    this.progressBarValueSubject.unsubscribe();
  }
}
