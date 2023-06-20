import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
 progress = false;
  constructor() { }
  setProgress(show: boolean) {
    this.progress = show;
  }
  getProgress(): boolean {
    return this.progress;
  }
  

}
