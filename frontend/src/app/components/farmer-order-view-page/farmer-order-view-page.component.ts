import { Component } from '@angular/core';
import {FirebaseStorageService} from "../../services/firebaseStorage/firebase-storage.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-farmer-order-view-page',
  standalone: true,
  imports: [FormsModule, CommonModule, MatIconModule],
  templateUrl: './farmer-order-view-page.component.html',
  styleUrl: './farmer-order-view-page.component.css'
})
export class FarmerOrderViewPageComponent {

  orders: any[] = [];
  accepted: boolean = false;
  constructor(private firebaseStorageService : FirebaseStorageService, private router: Router) {
  }


  ngOnInit(): void {
    //TODO: remove the for later version release
    setTimeout(()=>{
      this.accepted= true;
    }, 6000)
    this.firebaseStorageService.getInfoList().subscribe((data: any)=>{
      this.orders = data;
    })
  }

}
