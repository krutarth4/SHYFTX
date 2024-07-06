import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule, MatDialog} from "@angular/material/dialog";
import {MatNativeDateModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {TransferDataService} from "../../services/transferData/transfer-data.service";
import {CommonModule} from "@angular/common";
import {GoogleAPIService} from "../../services/GoogleAPI/google-api.service";
import {MatStepperModule} from '@angular/material/stepper';
import {FirebaseStorageService} from "../../services/firebaseStorage/firebase-storage.service";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";

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
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    CommonModule,
    MatStepperModule
  ],
  templateUrl: './farmer-create-orders-dashboard.component.html',
  styleUrls: ['./farmer-create-orders-dashboard.component.css']
})
export class FarmerCreateOrdersDashboardComponent implements OnInit {

  @ViewChild('autocompleteInput', { static: false }) autocompleteInput: ElementRef | undefined;
  newTodo: string = '';
  isFormOpen = false;
  tripForm: FormGroup;
  truckSelectionForm: FormGroup;
  paymentForm: FormGroup;
  isLoading = false;
  formData: any;
  autocompleteService: any;
  predictions: any[] = [];
  availableTrucks: any[] = [
    { type: 'Flatbed Truck', description: 'Ideal for heavy loads.', capacity: 1000, price: 560 },
    { type: 'Box Truck', description: 'Perfect for dry goods.', capacity: 800, price: 420 },
    { type: 'Refrigerated Truck', description: 'For perishable items.', capacity: 500, price: 250 }
  ];

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder, 
    private snackBar: MatSnackBar,
    private transferDataService : TransferDataService, 
    private googlePlacesService: GoogleAPIService,
    private firebaseStorageService: FirebaseStorageService
  ) {
    this.tripForm = this.fb.group({
      source: ['', Validators.required],
      destination: ['', Validators.required],
      pickupDate: ['', Validators.required],
      dropoffDate: ['', Validators.required],
      typeOfGoods: ['', Validators.required],
      comments: [''],
      vehicleCategory: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.min(1)]]
    });

    this.truckSelectionForm = this.fb.group({
      selectedTruck: ['', Validators.required]
    });

    this.paymentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      expiryDate: ['', Validators.required],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    });
  }

  ngOnInit(): void {
    // this.autocompleteService = new google.maps.places.AutocompleteService();
  }

  addTodo() {
    this.isFormOpen = !this.isFormOpen;
    if (this.newTodo.trim()) {
      this.newTodo = '';
    }
  }

  onInputChange(): void {
    const input = this.autocompleteInput?.nativeElement.value;

    if (input) {
      this.googlePlacesService.getPlacePredictions(input).subscribe(response => {
        if (response.status === 'OK') {
          this.predictions = response.predictions;
        } else {
          this.predictions = [];
        }
      });
    } else {
      this.predictions = [];
    }
  }

  onSubmit() {
    console.log(this.tripForm.value);
    this.transferDataService.addFarmerRequest(this.tripForm.value)
    if (this.tripForm.valid) {
      this.isLoading = true;
      this.formData = this.tripForm.value;
      this.formData.id = this.generateUniqueId();
      this.formData.timestamp = this.getCurrentTimestamp();

      // Simulate an asynchronous operation (e.g., HTTP request)
      setTimeout(() => {
        this.isLoading = false;
        this.snackBar.open('Order submitted successfully!', 'Close', {
          duration: 3000,
        });
        this.firebaseStorageService.saveInfo(this.formData)
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

  selectPrediction(prediction: any, formField: string): void {
    this.tripForm.controls[formField].setValue(prediction.description);
    this.predictions = [];
  }

  selectTruck(truck: any): void {
    this.truckSelectionForm.patchValue({ selectedTruck: truck.type });
  }

  // Function to generate a unique ID
  private generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  // Function to get the current timestamp
  private getCurrentTimestamp(): string {
    return new Date().toISOString();
  }
}
