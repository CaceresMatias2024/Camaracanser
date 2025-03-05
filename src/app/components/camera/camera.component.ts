import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CameraService } from '../../services/camera.service';

interface PhotoItem {
  url: string;
  timestamp: Date;
}

@Component({
  selector: 'app-camera',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent {
  imgUrl: string = '';
  photos: PhotoItem[] = [];
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private cameraService: CameraService) {
    this.photos = this.cameraService.getCapturedPhotos();
  }

  async takePhoto() {
    this.errorMessage = '';
    
    try {
      this.loading = true;
      
      const photoUrl = await this.cameraService.takePicture();
      this.imgUrl = photoUrl;
      this.photos = this.cameraService.getCapturedPhotos();
      
      this.loading = false;
    } catch (error) {
      console.error('Error al capturar imagen:', error);
      this.errorMessage = error instanceof Error ? error.message : String(error);
      this.loading = false;
    }
  }

  setMainPhoto(photo: PhotoItem) {
    this.imgUrl = photo.url;
  }

  deletePhoto(index: number) {
    this.photos.splice(index, 1);
    
    if (this.photos.length > 0 && !this.photos.some(p => p.url === this.imgUrl)) {
      this.imgUrl = this.photos[0].url;
    } else if (this.photos.length === 0) {
      this.imgUrl = '';
    }
  }
}