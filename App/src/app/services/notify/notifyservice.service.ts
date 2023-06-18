import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { notification, notificationapires } from 'src/Interfaces/notification.interface';
import { Observable  } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NotifyserviceService {

  count = 0;
  constructor(private http: HttpClient) { }
  createNotification(data: any) {
    console.log(data);
    return this.http.post('http://localhost:3000/notification', data,{headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}).subscribe((res: any) => {
      console.log(res);
  }
  )
  }
  getNotification(): Observable<notificationapires>  {
    return this.http.get<notificationapires>('http://localhost:3000/notification', {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
  }
  notificationRead(not: any) {
    return this.http.put('http://localhost:3000/notification', not, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
  }
  notifyCount(): number {

    this.getNotification().subscribe((res: any) => {
      this.count = res.data.filter((not: notification) => not.read === false).length;
    }
    )
    return this.count
  }


}

