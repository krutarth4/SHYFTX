import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {TransferDataService} from "../../services/transferData/transfer-data.service";
import {Router, RouterModule} from "@angular/router";
import {AuthFirebaseService} from "../../services/authFirebase/auth-firebase.service";
import {FirebaseStorageService} from "../../services/firebaseStorage/firebase-storage.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private transferService: TransferDataService,
              private auth : AuthFirebaseService ,
              private router: Router,
              private db : FirebaseStorageService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async onLogin() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.auth.login(username, password).then((resolve:any) => {
          // Login successful, optionally redirect or perform other actions
        this.transferService.setUser(username, password);
          // console.info("login successfull", resolve)
        })
        .catch((error) => {
          // Login failed, display error message
         console.error("login failed", error);

        });
    }
  }



  logout() {

  }

}
