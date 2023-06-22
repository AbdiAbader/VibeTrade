import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserResponse, User } from 'src/app/interfaces/Users/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private http: HttpClient) { }

  getusers(): Observable<UserResponse> {
    return this.http.get<UserResponse>('http://localhost:3000/user')
    }

  deleteuser(userId: string): Observable<UserResponse> {
      const url = `http://localhost:3000/user/${userId}`; 
      return this.http.delete<UserResponse>(url)
    }
  
  updateuser(userId: string, user: User): Observable<UserResponse> {
      const url = `http://localhost:3000/user/${userId}`; 
      return this.http.put<UserResponse>(url, user)
    }


}
