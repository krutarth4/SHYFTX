import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  private apiUrl = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';
  constructor(private http: HttpClient) { }

  public getPlacePredictions(input: string): Observable<any> {
    const params = new HttpParams()
      .set('input', input)
      .set('types', 'geocode')
      .set('key', environment.apiKey);

    return this.http.get<any>(this.apiUrl, { params });
  }

}
