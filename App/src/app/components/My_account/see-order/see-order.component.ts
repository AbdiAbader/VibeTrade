import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-see-order',
  templateUrl: './see-order.component.html',
  styleUrls: ['./see-order.component.scss']
})
export class SeeOrderComponent implements OnInit {
  order: any;
constructor (@Inject(MAT_DIALOG_DATA) public data: any) {
this.order = this.data.order;
}
ngOnInit(): void {
  console.log('data');
  this.order = this.data;
  console.log(this.data);
}
}
