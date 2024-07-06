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
  getUserRole(email: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.store.collection('userRole', ref => ref.where('email', '==', email))
        .get()
        .toPromise()
        .then((snapshot:any) => {
          if (snapshot?.empty) {
            reject('No matching documents.');
            return;
          }
          const userRole = snapshot.docs[0].data().userType;
          resolve(userRole);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
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
