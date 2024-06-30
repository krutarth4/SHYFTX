import {Component, signal} from '@angular/core';
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {DatePipe} from "@angular/common";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatCardModule} from "@angular/material/card";


export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-truck-options',
  standalone: true,
  imports: [MatListModule,
    MatIconModule,
    MatDividerModule,
    DatePipe,MatExpansionModule,MatCardModule],
  templateUrl: './truck-options.component.html',
  styleUrl: './truck-options.component.css'
})
export class TruckOptionsComponent {
  folders: Section[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    },
  ];
  notes: Section[] = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    },
  ];
  readonly panelOpenState = signal(false);
}
