import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {
  progress = false;
  constructor () {}
  ngOnInit(): void {
   
  }



  handleProgressBar(show: boolean) {
    this.progress = show;
  }
}