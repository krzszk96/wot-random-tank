import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getTanks(): Observable<any> {
    return this.http.get(
      'https://api.worldoftanks.eu/wot/encyclopedia/vehicles/?application_id=08e766396428f7a98c1474af8fec6031&fields=name%2Cimages.big_icon'
    );
  }
}
