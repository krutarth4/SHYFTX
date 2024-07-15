import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {FirebaseStorageService} from "../firebaseStorage/firebase-storage.service";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService {
  private roleSource = new BehaviorSubject<string>('none');
  currentRole = this.roleSource.asObservable();

  constructor(private afAuth: AngularFireAuth, private snackBar: MatSnackBar, private router: Router, private firebaseStorage: FirebaseStorageService) { }


   signUp(email: string, password: string, userRole: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((response) => {
        // Sign up successful
        this.snackBar.open(`Signup successful! please login again.`, 'Close', {
          duration: 2000,
        });
        this.firebaseStorage.saveUserRole({
          email: email,
          userrole: userRole
        })
        this.router.navigate(['login']); ///Removed redirection
      })
      .catch((error) => {
        this.snackBar.open(`${error.message} <br> Redirecting to login page`, 'Close', {
          duration: 2000,
        });
        this.router.navigate(["login"])
        // An error occurred
      });
  }

   login(email: string, password: string) {

    return new Promise((resolve: any, reject : any) => {
      this.afAuth.signInWithEmailAndPassword(email, password)
        .then((response) => {
          // Login successful
          resolve(response);
          const extrainfo = (email == "admin@admin.com"|| email == "hans@mueller.com" || email == "ben@gmail.com")? "":"The access for the account is restricted."

          this.snackBar.open(`Login successful for ${email}. ${extrainfo}`, 'Close', {
            duration: 5000,
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
        this.router.navigate(['home']);
      })
      .catch((error) => {
        // An error occurred
      });
  }
  //getter method as a property

  get isAuthenticated(): boolean {
    return this.afAuth?.currentUser !== null;
  }

  getAuthState(): Observable<any> {
    return this.afAuth.authState;
  }

  getUserName(){
    return this.afAuth.currentUser
  }




}
