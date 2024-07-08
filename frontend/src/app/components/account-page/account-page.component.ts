import { Component } from '@angular/core';
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
    MatStepperModule],
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.css'
})
export class AccountPageComponent {

  accountForm: FormGroup;
  isEditMode: boolean = false;

  constructor(private fb: FormBuilder) {
    this.accountForm = this.fb.group({
      username: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      phone: [{ value: '', disabled: true }, Validators.required]
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
      phone: '1234567890'
    };
    this.accountForm.patchValue(userData);
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
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
      this.toggleEditMode();
    }
  }

  onCancel() {
    this.toggleEditMode();
    this.loadUserData(); // Reset form to original data
  }

}
