import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { reviewapires } from 'src/Interfaces/review';
import { AuthserviceService } from '../Auth/authservice.service';
@Injectable({
  providedIn: 'root'
})
export class ReviewserviceService {
 Api: string = 'http://localhost:3000/review/';
  constructor(private http: HttpClient, private authService: AuthserviceService) { }

  getReviews(id: string): Observable<reviewapires> {
    return this.http.get<reviewapires>(this.Api+id,{headers: {Authorization: `Bearer ${this.authService.getToken()}`}});
  }
addReview(review: any): Observable<reviewapires>{
  return this.http.post<reviewapires>(this.Api, review, {headers: {Authorization: `Bearer ${this.authService.getToken()}`}});
}
updatelike(id: string): Observable<reviewapires>{
  return this.http.put<reviewapires>(this.Api+id, {}, {headers: {Authorization: `Bearer ${this.authService.getToken()}`}});
}
updatedislike(id: string): Observable<reviewapires>{
  return this.http.put<reviewapires>(this.Api+'dislike/'+id, {}, {headers: {Authorization: `Bearer ${this.authService.getToken()}`}});
}
addReply(id: string, content: any): Observable<reviewapires>{
    const replay = {
      content: content
    }
  return this.http.post<reviewapires>(this.Api+'reply/'+id, replay, {headers: {Authorization: `Bearer ${this.authService.getToken()}`}});
}
addReplyofReply(id: string, content: any): Observable<reviewapires>{
  const replay = {
    content: content
  }
  return this.http.post<reviewapires>(this.Api+'reply/reply/'+id, replay, {headers: {Authorization: `Bearer ${this.authService.getToken()}`}});
}

replylike(id: string,rid: string): Observable<reviewapires>{
  return this.http.put<reviewapires>(this.Api+'reply/like/'+id, {id: rid}, {headers: {Authorization: `Bearer ${this.authService.getToken()}`}});
}
replydislike(id: string, rid: string): Observable<reviewapires>{
  return this.http.put<reviewapires>(this.Api+'reply/dislike/'+id ,{id: rid}, {headers: {Authorization: `Bearer ${this.authService.getToken()}`}});


}

}
