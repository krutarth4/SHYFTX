import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {

  constructor(private store: AngularFirestore) {

  }
  getUserRole(email: string){
    return this.store.collection('userRole',
        ref => ref.where('email', '==', email)).valueChanges()
  }
  saveUserRole (data :any){
    const infoRef = this.store.collection('userRole');
    infoRef.add(data);
  }

  // Save information
  saveInfo(data: any): void {
    const infoRef = this.store.collection(environment.firebaseStorage);
    infoRef.add(data);
  }

  // Retrieve information
  getInfoList(): Observable<any[]> {
    return this.store.collection(environment.firebaseStorage).valueChanges();
  }
}
