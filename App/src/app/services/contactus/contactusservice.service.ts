import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ContactusserviceService {

  constructor(private http: HttpClient) { }

addContactUs(contactus: any): string{
this.http.post('http://0.0.0.0:3000/contactus', contactus).subscribe
((response: any) => {
  if (response.message) {
    return "Success"
    console.log("Success");
  }
  else{
    return "Failed";
    console.log("Failed");
  }
}
);
return "Failed";
console.log("Failed");
}
}