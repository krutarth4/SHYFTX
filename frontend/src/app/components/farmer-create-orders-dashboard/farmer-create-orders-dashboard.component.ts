import {Component, ElementRef, ViewChild} from '@angular/core';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatSelectModule} from "@angular/material/select";
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
import {CommonModule} from "@angular/common";
import {GoogleAPIService} from "../../services/GoogleAPI/google-api.service";
import {FirebaseStorageService} from "../../services/firebaseStorage/firebase-storage.service";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";

// declare var google: any;
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
    MatProgressSpinner,
    CommonModule,


  ],
  templateUrl: './farmer-create-orders-dashboard.component.html',
  styleUrl: './farmer-create-orders-dashboard.component.css'
})
export class FarmerCreateOrdersDashboardComponent {

  @ViewChild('autocompleteInput', { static: false }) autocompleteInput: ElementRef | undefined;
  newTodo: string = '';
  isFormOpen= false;
  tripForm: FormGroup;
  isLoading = false;
  formData:any
  autocompleteService: any;
  predictions: any[] = [];
  // private apiKey = environment.apiKey;
  constructor(public dialog: MatDialog,private fb: FormBuilder, private snackBar: MatSnackBar,
              private transferDataService : TransferDataService, private googlePlacesService: GoogleAPIService,
              private firebaseStorageService: FirebaseStorageService
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

  ngOnInit(): void {
    // this.autocompleteService = new google.maps.places.AutocompleteService();
  }

  addTodo() {
    this.isFormOpen =!this.isFormOpen;
    if (this.newTodo.trim()) {
      this.newTodo = '';
    }
  }

  onInputChange(): void {

    //Through adding to index.html
    const input = this.autocompleteInput?.nativeElement.value;
    // if (input) {
    //   this.autocompleteService.getPlacePredictions({ input }, (predictions: any, status: any) => {
    //     if (status === google.maps.places.PlacesServiceStatus.OK) {
    //       this.predictions = predictions;
    //     } else {
    //       this.predictions = [];
    //     }
    //   });
    // } else {
    //   this.predictions = [];
    // }

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
}
