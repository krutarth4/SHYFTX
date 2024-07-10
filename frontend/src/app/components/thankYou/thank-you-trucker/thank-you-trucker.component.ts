import { Component } from '@angular/core';
import {Router} from "@angular/router";


declare var confetti: any;
@Component({
  selector: 'app-thank-you-trucker',
  standalone: true,
  imports: [],
  templateUrl: './thank-you-trucker.component.html',
  styleUrl: './thank-you-trucker.component.css'
})

export class ThankYouTruckerComponent {

  constructor(private router : Router) {
  }

  ngOnInit(){
    this.launchConfetti();
    setTimeout(()=>{
      this.router.navigate(['invoice'])
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
