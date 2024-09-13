import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  private readonly backendURL;

  constructor(private httpClient: HttpClient) {
    this.backendURL = 'http://localhost:3000';
  }

  //-------------------
  urlString(url: string) {
    url === '/' ? '' : `/${url}`;
    return `${this.backendURL}${url}`;
  }
  //-------------------

  get(url: string) {
    return this.httpClient.get(this.urlString(url));
  }

  // post(url: string, payload: { key: string}) {
  //   return this.httpClient.post(this.urlString(url), payload);
  // }
}
