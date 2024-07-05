import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GoogleAPIService {
  private apiUrl = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';

  constructor(private http: HttpClient) { }

  getPlacePredictions(input: string): Observable<any> {
    const params = new HttpParams()
      .set('input', input)
      .set('types', 'geocode')
      .set('key', "");

    return this.http.get<any>('/api/place/autocomplete/json', { params });
  }


}
