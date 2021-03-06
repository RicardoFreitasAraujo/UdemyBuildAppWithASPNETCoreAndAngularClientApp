import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getUsers(page?, itemsPerPage?, likesParam?): Observable<PaginatedResult<User[]>> {
    
    const paginationResult : PaginatedResult<User[]> = new PaginatedResult<User[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (likesParam === 'Likers') {
      params = params.append('likers','true');
    }

    if (likesParam === 'Likees') {
      params = params.append('likees','true');
    }

    return this.http.get<User[]>(this.baseUrl + 'users', { observe: 'response', params })
    .pipe(
      map(response => {
        
        paginationResult.result = response.body;
        
        if (response.headers) {
          if (response.headers.get('Pagination') != null) {
            paginationResult.pagination = JSON.parse(response.headers.get('Pagination'))
          }
        }
        
        return paginationResult;
      })
    );

    /*
    return this.http.get<User[]>(this.baseUrl + 'users', { observe: 'response', params })
                  .pipe(
                    map(response => {
                      paginationResult.result = response.body;
                      if (response.headers.get('Pagination') != null) {
                        paginationResult.pagination = JSON.parse(response.headers.get('Pagination'))
                      }
                      return PaginatedResult;
                    })
                  );
                  */
  }

  public getUser(id: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }

  public updateUser(id:number, user:User) {
    return this.http.put(this.baseUrl + 'users/' + id, user);
  }

  public setMainPhoto(userId: number, id: number) {
    return this.http.post(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain',{});
  }

  public deletePhoto(userId:number, id:number) {
    return  this.http.delete(this.baseUrl + 'users/' + userId + '/photos/' + id);
  }

  public sendLike(id: number, recipientId: number) {
    return this.http.post(this.baseUrl + 'users/' + id + '/like/' + recipientId, {})
  }

}
