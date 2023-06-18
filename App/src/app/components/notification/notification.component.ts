import { Component, OnInit } from '@angular/core';
import { NotifyserviceService } from '../../services/notify/notifyservice.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit{
  notifications: any;
  constructor(private notify: NotifyserviceService) { 
  
  }
  ngOnInit(): void {
    this.getNotification();
  
  }

getNotification() {
this.notify.getNotification().subscribe((res: any) => {
  this.notifications = res.data;

}
)
}
seen(not: any) {
  this.notify.notificationRead(not).subscribe((res: any) => {
    this.getNotification();
  }
  )
}
    
}


