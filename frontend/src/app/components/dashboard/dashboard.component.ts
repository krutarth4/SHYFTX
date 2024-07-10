import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {FirebaseStorageService} from "../../services/firebaseStorage/firebase-storage.service";
import {Router} from "@angular/router";


interface Order {
  id: number;
  farmer: { firstname: string; lastname: string; };
  source: string;
  destination: string;
  estimatedPrice: number;
  capacity: number;
  typeOfGood: string;
  expanded?: boolean;
  adjustedPrice?: number;
  comments?: string
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  orders: Order[] = [
    {
      id: 1,
      farmer: { firstname: 'John', lastname: 'Doe' },
      source: 'Berlin',
      destination: 'Frankfurt',
      estimatedPrice: 450,
      capacity: 200,
      typeOfGood: 'Grain',
      expanded: false
    },
    {
      id: 2,
      farmer: { firstname: 'Jeff', lastname: 'Collins' },
      source: 'Munich',
      destination: 'Hamburg',
      estimatedPrice: 645,
      capacity: 450,
      typeOfGood: 'Grain',
      expanded: false
    },
    {
      id: 3,
      farmer: { firstname: 'Lisa', lastname: 'Meier' },
      source: 'Munich',
      destination: 'Essen',
      estimatedPrice: 950,
      capacity: 550,
      typeOfGood: 'Grain',
      expanded: false
    },
    {
      id: 4,
      farmer: { firstname: 'John', lastname: 'Doe' },
      source: 'Berlin',
      destination: 'Hamburg',
      estimatedPrice: 300,
      capacity: 200,
      typeOfGood: 'Grain',
      expanded: false
    },
    {
      id: 5,
      farmer: { firstname: 'John', lastname: 'Doe' },
      source: 'Berlin',
      destination: 'Hamburg',
      estimatedPrice: 300,
      capacity: 200,
      typeOfGood: 'Grain',
      expanded: false
    }
  ];
  constructor(private firebaseStorageService : FirebaseStorageService, private router: Router) {
  }

  ngOnInit(): void {
    this.firebaseStorageService.getInfoList().subscribe((data: any)=>{
      this.orders = data;
    })
  }
  toggleOrderDetails(order: Order, event: Event): void {
    event.stopPropagation(); // Prevents the event from bubbling up to the parent elements
    order.expanded = !order.expanded;
  }

  acceptOrder(order: Order): void {
    console.log(`Order ${order.id} accepted with price ${order.adjustedPrice || order.estimatedPrice}`);
    // Implement accept order logic
  }

  declineOrder(order: Order): void {
    console.log(`Order ${order.id} declined`);
    // Implement decline order logic
  }

  orderAccepted(order: any) {
    this.router.navigate(['/thanks/trucker']);

  }
}
