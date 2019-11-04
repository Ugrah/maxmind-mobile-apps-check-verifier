import { Component, OnInit } from '@angular/core';
import { OcrCameraService } from 'src/app/services/ocr-camera.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {

  selectedImage: string;
  imageText: string;
  progressBarValue:number;

  constructor(private ocrService: OcrCameraService) {
  }

  ngOnInit() {
    this.ocrService.selectedImageSubject.subscribe((imagePath: string) => { this.selectedImage = imagePath; });
    this.ocrService.imageTextSubject.subscribe((text: string) => { this.imageText = text; });
    this.ocrService.progressBarValueSubject.subscribe((value: number) => { this.progressBarValue = value; });
  }

  onRecognize() {
    this.ocrService.recognizeImage();
  }
}
