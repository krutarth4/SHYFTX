import { Component } from '@angular/core';
import {Router} from "@angular/router";
// import * as confetti from 'canvas-confetti';

declare var confetti: any;
@Component({
  selector: 'app-thank-you',
  standalone: true,
  imports: [],
  templateUrl: './thank-you.component.html',
  styleUrl: './thank-you.component.css'
})
export class ThankYouComponent {


  constructor(private router : Router) {
  }

  ngOnInit(){
    this.launchConfetti();
    setTimeout(()=>{
      this.router.navigate(['contract'])
    },5000)
  }


  launchConfetti() {
    const duration = 4 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    requestAnimationFrame(frame);
  }

}
