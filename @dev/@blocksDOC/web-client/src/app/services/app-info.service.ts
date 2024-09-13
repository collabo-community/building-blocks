import { Injectable } from '@angular/core';
import { ApiRequestService } from './api-request.service';

@Injectable({
  providedIn: 'root'
})
export class AppInfoService {

  constructor(private apiRequestService: ApiRequestService) {}

  getAppInfo() {
    return this.apiRequestService.get('/');
  }
}
