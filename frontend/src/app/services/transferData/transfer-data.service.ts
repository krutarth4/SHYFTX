import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransferDataService {

  farmerRequest:any =[]; // the order form will be saved here

  constructor() {
    // this.farmerRequest = [];
  }

   getFarmerRequest(): any {
    return this.farmerRequest;
  }

   addFarmerRequest(request: any) {
    this.farmerRequest.push(request);
    console.log("transfer service",this.farmerRequest);
  }






}
