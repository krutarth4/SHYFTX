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
import {Router} from "@angular/router";

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
    MatStepperModule,MatGridListModule
  ],
  templateUrl: './farmer-create-orders-dashboard.component.html',
  styleUrls: ['./farmer-create-orders-dashboard.component.css']
})
export class FarmerCreateOrdersDashboardComponent implements OnInit {

  @ViewChild('autocompleteInput', { static: false }) autocompleteInput: ElementRef | undefined;
  @ViewChild('autocompleteInput2', { static: false }) autocompleteInput2: ElementRef | undefined;
  newTodo: string = '';
  isFormOpen = false;
  tripForm: FormGroup;
  truckSelectionForm: FormGroup;
  paymentForm: FormGroup;
  isLoading = false;
  formData: any;
  autocompleteService: any;
  predictions: any[] = [];
  recipientPrediction: any[] = [];
  availableTrucks: any[] = [
    { id: 3, type: 'Reefer', description: 'For perishable items.', pricePerKm: 2.2, capacity: 500, price: 250, orderType: 'Batched Order', refrigerated: 'Refrigerated', destinations: 3, sustainabilityType: 'Sustainable' },
    { id: 1, type: 'Flatbed Truck', description: 'Ideal for heavy loads.', pricePerKm: 1.9, capacity: 1000, price: 460, orderType: 'Single Order', refrigerated: 'Not Refrigerated', destinations: 1, sustainabilityType: 'Acceptable' },
    { id: 2, type: 'Box Truck', description: 'Perfect for dry goods.', pricePerKm: 1.8, capacity: 800, price: 420, orderType: 'Single Order', refrigerated: 'Not Refrigerated', destinations: 1, sustainabilityType: 'Acceptable' },
    { id: 5, type: 'Light Truck', description: 'Medium-sized commercial cargo vehicle.', pricePerKm: 1.5, capacity: 500, price: 350, orderType: 'Single Order', refrigerated: 'Not Refrigerated', destinations: 1, sustainabilityType: 'Concerning' },
    { id: 6, type: 'Van', description: 'Small utility vehicle.', pricePerKm: 1.1, capacity: 500, price: 270, orderType: 'Single Order', refrigerated: 'Not Refrigerated', destinations: 1, sustainabilityType: 'Concerning' },
    { id: 4, type: 'Semi Trailer', description: 'Large freight transport trailer.', pricePerKm: 2.1, capacity: 500, price: 500, orderType: 'Single Order', refrigerated: 'Refrigerated', destinations: 1, sustainabilityType: 'Severe' }
  ];
  sourcePrediction: boolean = false;
  summaryData: any = {};

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private transferDataService : TransferDataService,
    private googlePlacesService: GoogleAPIService,
    private firebaseStorageService: FirebaseStorageService,
    private router: Router
  ) {
    this.tripForm = this.fb.group({
      source: ['', Validators.required],
      recipientFirstName: ['', Validators.required],
      recipientLastName: ['', Validators.required],
      recipientPhone: ['', Validators.required],
      recipientCountry: ['', Validators.required],
      recipientState: ['', Validators.required],
      recipientCity: ['', Validators.required],
      recipientZipCode: ['', Validators.required],
      recipientStreet: ['', Validators.required],
      recipientHouseNumber: ['', Validators.required,],
      recipientMoreInfo: [''],
      pickupDate:['', Validators.required],
      dropoffDate:['', Validators.required],
      typeOfGoods: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.min(0)]],
      comments: ['']
    });

    this.truckSelectionForm = this.fb.group({
      selectedTruck: ['', Validators.required]
    });

    this.paymentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(16)]],
      expiryDate: ['', Validators.required],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    });
  }

  ngOnInit(): void {
    // this.autocompleteService = new google.maps.places.AutocompleteService();
  }


  onInputChange(field: string): void {
    let input = this.autocompleteInput?.nativeElement.value;
    console.log(input)

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
    this.transferDataService.addFarmerRequest(this.tripForm.value)
    if (this.tripForm.valid) {
      this.isLoading = true;
      this.formData = this.tripForm.value;
      this.formData.id = this.generateUniqueId();
      this.formData.timestamp = this.getCurrentTimestamp();
      this.formData.truck = this.truckSelectionForm.value

      // Simulate an asynchronous operation (e.g., HTTP request)
      setTimeout(() => {
        this.isLoading = false;
        this.snackBar.open('Order submitted successfully!', 'Close', {
          duration: 1500,
        });

        this.firebaseStorageService.saveInfo(this.formData)
        this.resetForm();
      }, 2000); // Simulating a 2-second delay

      //redirect timeout
      setTimeout(()=>{
        this.router.navigate(['thanks'])
      })
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
    console.log(prediction);
    this.tripForm.controls[formField].setValue(prediction.description);
    this.predictions = [];
    this.recipientPrediction =[]
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

  onInputChangeRecipient(recipientStreet: string) {
    let input = this.autocompleteInput2?.nativeElement.value;

    if (input) {
      this.googlePlacesService.getPlacePredictions(input).subscribe(response => {
        if (response.status === 'OK') {
          this.recipientPrediction = response.predictions;
        } else {
          this.recipientPrediction = [];
        }
      });
    } else {
      this.recipientPrediction = [];
    }
  }

  saveUserInput() {
    this.transferDataService.addFarmerRequest(this.tripForm.value)
    this.summaryData = {
      trip: this.tripForm.value,
      truck: this.truckSelectionForm.value
    };


    console.log(this.tripForm.value)
  }

  getSustainabilityBarWidth(type: string): string {
    switch (type) {
        case 'Sustainable':
            return '100%';
        case 'Acceptable':
            return '65%';
        case 'Concerning':
            return '40%';
        case 'Severe':
            return '20%';
        default:
            return '0%';
    }
}
}
