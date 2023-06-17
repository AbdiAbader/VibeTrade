import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { notification, notificationapires } from 'src/Interfaces/notification.interface';
import { Observable  } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NotifyserviceService {

  constructor(private http: HttpClient) { }
  createNotification(data: any) {
    return this.http.post('http://localhost:3000/notification', data,{headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
  }
  getNotification(): Observable<notificationapires>  {
    return this.http.get<notificationapires>('http://localhost:3000/notification', {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
  }
  notificationRead() {
    return this.http.put('http://localhost:3000/notification', {}, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
  }

}
