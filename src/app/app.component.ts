import { Component } from '@angular/core';
import { CameraComponent } from './components/camera/camera.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CameraComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myapp';
}
