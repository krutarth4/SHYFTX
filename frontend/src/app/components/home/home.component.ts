import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  showImageText: boolean = false;

  imageText: string = '';

  showText(text: string) {

    this.showImageText = true;

    this.imageText = text;

  }

  hideText() {

    this.showImageText = false;

    this.imageText = '';

  }
}
