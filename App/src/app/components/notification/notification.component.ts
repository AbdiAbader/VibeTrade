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
    console.log(this.getNotification())
  }

getNotification() {
this.notify.getNotification().subscribe((res: any) => {
  this.notifications = res.data;
  console.log(res.data)
}
)
}
    
}


