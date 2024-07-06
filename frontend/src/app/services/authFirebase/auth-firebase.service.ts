import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService {

  constructor(private afAuth: AngularFireAuth, private snackBar: MatSnackBar) { }


   signUp(email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        // Sign up successful
      })
      .catch((error) => {
        // An error occurred
      });
  }

   login(email: string, password: string) {

    return new Promise((resolve: any, reject : any) => {
      this.afAuth.signInWithEmailAndPassword(email, password)
        .then(() => {
          // Login successful
          console.error("login successfull", resolve)
          this.snackBar.open(`Login successful for ${email}`, 'Close', {
            duration: 2000,
          });

        })
        .catch((error:any) => {
          // An error occurred
          //TODO: can call signup directly here
          this.snackBar.open('Login failed! please provide correct username and password or if new user click on signup', 'Close', {
            duration: 3000,
          });
        });

    })

  }

   logout() {
    this.afAuth.signOut()
      .then(() => {
        // Logout successful
      })
      .catch((error) => {
        // An error occurred
      });
  }
  //getter method as a property

  get isAuthenticated(): boolean {
    return this.afAuth.currentUser !== null;
  }




}
