import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthFirebaseService} from "../../services/authFirebase/auth-firebase.service";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {CommonModule} from "@angular/common";
import {MatRadioButton, MatRadioModule} from "@angular/material/radio";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
  CommonModule, MatRadioModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private auth : AuthFirebaseService
  ) {}
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      userType: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  signup(): void {
    if (this.signupForm.valid) {
      const { email, password, userType } = this.signupForm.value;
      console.info("signup successfull", email, password, userType);
     this.auth.signUp(email,password,userType)
    }
  }
}
