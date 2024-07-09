import {Component, model} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {CommonModule} from "@angular/common";
import {MatStepperModule} from "@angular/material/stepper";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {TransferDataService} from "../../services/transferData/transfer-data.service";

@Component({
  selector: 'app-account-page',
  standalone: true,
  imports: [    MatButtonModule,
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
    MatStepperModule, MatCheckboxModule],
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.css'
})
export class AccountPageComponent {

  accountForm: FormGroup;
  isEditMode: boolean = false;

  constructor(private fb: FormBuilder, private transferService: TransferDataService) {
    this.accountForm = this.fb.group({
      username: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      phone: [{ value: '', disabled: true }, Validators.required],
      firstName: [{ value: '', disabled: true }, Validators.required],
      lastName: [{ value: '', disabled: true }, Validators.required],
      businessName: [{ value: '', disabled: true }, Validators.required],
      streetAddress: [{ value: '', disabled: true }, Validators.required],
      city: [{ value: '', disabled: true }, Validators.required],
      stateProvince: [{ value: '', disabled: true }, Validators.required],
      postalCode: [{ value: '', disabled: true }, Validators.required],
      country: [{ value: '', disabled: true }, Validators.required],
      produceGrains: [{ value: false, disabled: true }],
      produceVegetables: [{ value: false, disabled: true }],
      produceFruits: [{ value: false, disabled: true }],
      produceDairy: [{ value: false, disabled: true }],
      produceMeat: [{ value: false, disabled: true }],
      produceOther: [{ value: false, disabled: true }],
      annualYield: [{ value: '', disabled: true }, Validators.required],
      password: [{ value: '', disabled: true }, [ Validators.minLength(6)]],
      confirmPassword: [{ value: '', disabled: true }, [ Validators.minLength(6)]],
      specialInstructions: [{ value: '', disabled: true }]
    });
  }



  ngOnInit(): void {
    // Fetch user data from a service and patch the form
    this.loadUserData();
  }

  loadUserData() {
    // Dummy data for demonstration; replace with actual data fetching logic
    const userData = {
      username: 'johndoe',
      email: 'johndoe@example.com',
      phone: '1234567890',
      firstName: "Hans",
      lastName: 'Müller',
      businessName: "Müller Farms",
      streetAddress: "Ostheimer Straße 117–139",
      city: 'Cologne',
      stateProvince: 'Cologne',
      postalCode: '51107',
      country: 'Germany',
      produceGrains:true,
      produceVegetables:true,
      produceFruits: true,
      produceDairy: false,
      produceMeat: false,
      produceOther: false,
      annualYield: '150.75',
      password: '',
      confirmPassword:'' ,
      specialInstructions: 'Need a reliable person to deliver the cargo on time '
    };
    this.accountForm.patchValue(userData);
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    this.accountForm.patchValue(this.transferService.getPersonalInformation());
    if (this.isEditMode) {
      this.accountForm.enable();
    } else {
      this.accountForm.disable();
      // Optionally save changes here
    }
  }

  onSave() {
    if (this.accountForm.valid) {
      // Save changes
      console.log('Form Value:', this.accountForm.value);
      //TODO: save the data in the backend
      this.transferService.setPersonalInformation(this.accountForm.value)

      this.toggleEditMode();
    }
  }

  onCancel() {
    this.toggleEditMode();
    this.loadUserData(); // Reset form to original data
  }

}
