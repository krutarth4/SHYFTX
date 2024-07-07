import { Injectable } from '@angular/core';
import {BehaviorSubject, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {FirebaseStorageService} from "../firebaseStorage/firebase-storage.service";

@Injectable({
  providedIn: 'root'
})
export class TransferDataService {

 private userMap =  new Map<string,any>();
  private userRoleSubscription: Subscription | undefined;
  private roleSource = new BehaviorSubject<string>('none');
  currentRole = this.roleSource.asObservable();
  private userRole : string ="none"
  farmerRequest:any =[]; // the order form will be saved here

  constructor(private router: Router,private db: FirebaseStorageService) {
    // this.farmerRequest = [];
    this.userMap.set('role', "none");
  }

   getFarmerRequest(): any {
    return this.farmerRequest;
  }

   addFarmerRequest(request: any) {
    this.farmerRequest.push(request);
    console.log("transfer service",this.farmerRequest);
  }

   setUser(username: string,password: string){
      console.log("transfer setuser", username);

      this.userMap.set("username",username);
      this.userMap.set("pass",password);

      this.userRoleSubscription = this.db.getUserRole(username).subscribe( (data:any) =>{
        console.log(username);
        console.log(data[0].userrole.toLowerCase());
        this.userMap.set("role",data[0].userrole.toLowerCase());
        this.roleSource.next(data[0].userrole.toLowerCase());
        if(this.getUserRole() =="shipper"){
          this.router.navigate(['farmer']);
        }else if(this.getUserRole() =="carrier"){
          console.log("calling carrier")
          this.router.navigate(['dashboard']);
        }else{
          this.router.navigate(['home']);
        }
    })

  }
  getUserRole(){
    return this.userMap.has("role")? this.userMap.get("role") : "none";
  }

  clearUserData() {
    this.userRoleSubscription?.unsubscribe();
    console.log("clearuserdata");
    this.userMap.set("role",null);
    this.userMap.clear();
    this.roleSource.next("none");
    this.router.navigate(['home']);

  }
}
