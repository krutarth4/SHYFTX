import { Component } from '@angular/core';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatSelectModule} from "@angular/material/select";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {FormDialogComponent} from "../form-dialog/form-dialog.component";
import {MatNativeDateModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {TransferDataService} from "../../services/transferData/transfer-data.service";


@Component({
  selector: 'app-farmer-create-orders-dashboard',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatExpansionModule,
    FormsModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    ReactiveFormsModule, // Make sure this is included
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatSnackBarModule,
    MatProgressSpinner
  ],
  templateUrl: './farmer-create-orders-dashboard.component.html',
  styleUrl: './farmer-create-orders-dashboard.component.css'
})
export class FarmerCreateOrdersDashboardComponent {
  newTodo: string = '';
  orders: string[] = [];
  isFormOpen= false;
  tripForm: FormGroup;
  isLoading = false;
  formData:any
  constructor(public dialog: MatDialog,private fb: FormBuilder, private snackBar: MatSnackBar,
              private transferDataService : TransferDataService
  ) {
    this.tripForm = this.fb.group({
      source: [''],
      destination: [''],
      pickupDate: [''],
      dropoffDate: [''],
      typeOfGoods: [''],
      comments: [''],
      vehicleCategory: [''],
      capacity: ['']
    });
  }

  addTodo() {
    this.isFormOpen =!this.isFormOpen;
    if (this.newTodo.trim()) {
      this.newTodo = '';
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });}



  onSubmit() {
    console.log(this.tripForm.value);
    this.transferDataService.addFarmerRequest(this.tripForm.value)
    if (this.tripForm.valid) {
      this.isLoading = true;
      this.formData = this.tripForm.value;

      // Simulate an asynchronous operation (e.g., HTTP request)
      setTimeout(() => {
        this.isLoading = false;
        this.snackBar.open('Order submitted successfully!', 'Close', {
          duration: 3000,
        });
        this.resetForm();
      }, 2000); // Simulating a 2-second delay
    } else {
      // Handle form validation errors or invalid submission
      this.snackBar.open('Please fill in all required fields.', 'Close', {
        duration: 3000,
      });
    }
  }

  resetForm() {
    this.tripForm.reset();
  }
}
