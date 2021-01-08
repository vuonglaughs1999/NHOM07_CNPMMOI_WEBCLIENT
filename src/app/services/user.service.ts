import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }
  public signIn(user: User){
    console.log(user);
    return this._http.post<any>(`http://localhost:8080/api/authenticate`,user);
  }
  public getAllUsers(): Observable<User[]> {
    return this._http.get<any>(`http://localhost:8080/api/users`);
  }

  public createUser(user: User): Observable<any> {
    return this._http.post<any>(`http://localhost:8080/api/users`, user);
  }

  public updateUser(id: string, user: User): Observable<User> {
    return this._http.put<any>(`http://localhost:8080/api/users/${id}`, user);
  }

  public deleteUser(id: string): Observable<User> {
    return this._http.delete<any>(`http://localhost:8080/api/users/${id}`);
  }

  public getUserbyID(id: string): Observable<User> {
    return this._http.get<User>(`http://localhost:8080/api/users/${id}`);
  }
}
