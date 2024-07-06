import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService {

  constructor(private afAuth: AngularFireAuth) { }


  private signUp(email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        // Sign up successful
      })
      .catch((error) => {
        // An error occurred
      });
  }

  private login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        // Login successful
      })
      .catch((error) => {
        // An error occurred
      });
  }

  private logout() {
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
