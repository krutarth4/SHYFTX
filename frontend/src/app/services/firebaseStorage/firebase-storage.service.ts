import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
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

  updateStatusInfo(field: any, value: any){
    // console.error(field, value);
    return this.store.collection(environment.firebaseStorage).doc("lYrv1cnL1z2PCaLsgic4").update({
      "status": value,
    })
  }


  // Retrieve information
  getInfoList(): Observable<any[]> {
    return this.store.collection(environment.firebaseStorage).valueChanges();
  }
// get doc id on db collection ~ not implemented
  getDocID(){
    const a =this.store.collection(environment.firebaseStorage).doc()
    // console.error("a", a)
  }
}
