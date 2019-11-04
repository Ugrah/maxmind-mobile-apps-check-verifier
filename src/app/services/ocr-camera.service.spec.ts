import { TestBed } from '@angular/core/testing';

import { OcrCameraService } from './ocr-camera.service';

describe('OcrCameraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OcrCameraService = TestBed.get(OcrCameraService);
    expect(service).toBeTruthy();
  });
});
