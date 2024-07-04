import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class TransferDataService {

 private userMap =  new Map<string,any>();
  private roleSource = new BehaviorSubject<string>('admin');
  currentRole = this.roleSource.asObservable();
 private userRole : string ="admin"
  farmerRequest:any =[]; // the order form will be saved here

  constructor(private router: Router) {
    // this.farmerRequest = [];
    this.userMap.set('role', "admin");
  }

   getFarmerRequest(): any {
    return this.farmerRequest;
  }

   addFarmerRequest(request: any) {
    this.farmerRequest.push(request);
    console.log("transfer service",this.farmerRequest);
  }

    setUser(username: string,password: string){
    this.userMap.set("username",username);
    this.userMap.set("pass",password);
    this.userMap.set("role",username.toLowerCase());
    this.roleSource.next(this.getUserRole())
      if(this.getUserRole() =="farmer"){
        this.router.navigate(['farmer']);
      }else if(this.userRole =="trucker"){
        this.router.navigate(['dashboard']);
      }else{
        this.router.navigate(['home']);
      }
  }
  getUserRole(){
    return this.userMap.has("role")? this.userMap.get("role") : "admin";
  }

}
