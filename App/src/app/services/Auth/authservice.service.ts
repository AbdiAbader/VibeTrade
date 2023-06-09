import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
 
 private readonly TOKEN_KEY = 'token';
  constructor(private http: HttpClient) { }


login(token: string){

  localStorage.setItem(this.TOKEN_KEY, token);
}
logout(){
  localStorage.removeItem(this.TOKEN_KEY);
}
getToken(): string | null{
  return localStorage.getItem(this.TOKEN_KEY);
}
isAuthenticated(): boolean{
  return !!this.getToken();
}
checkTokenExpiration(): Observable<boolean> {
  const token = this.getToken();

  if (!token) {
    return of(false); 
  }

  return this.http.get<any>('http://localhost:3000/user/checktoken', { headers: { Authorization: `Bearer ${token}` } }).pipe(
    map(response => response.message === 'Token is valid'), 
    catchError(() => of(false))
  );
}

}