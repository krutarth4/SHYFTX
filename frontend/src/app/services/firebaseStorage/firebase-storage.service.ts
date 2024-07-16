import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {AngularFirestore,} from "@angular/fire/compat/firestore";
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
    const infoRef = this.store.collection(environment.firebaseStorage).doc(data.id).set(data).then((success=>{
      console.log("data added succesfully", success)
    }))

    // add(data).then((snapshot)=>{
    //   console.error(snapshot)
    // })

    // infoRef.add(data);
  }

  updateStatusInfo(field: any, value: any, order:any){
    // console.error(field, value);
    return this.store.collection(environment.firebaseStorage).doc(order.id).update({
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
