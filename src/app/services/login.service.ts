import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TokenStorageService } from './token-storage.service';
const AUTH_API = 'http://localhost:8080/api/authenticate';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private _http: HttpClient, private _tokenService:TokenStorageService) { }
  public loginUserFromRemote(user: User):Observable<any>{
    return this._http.post<any>(AUTH_API, { username: user.username, password: user.password}, httpOptions);
  }
  public externalLogin(fbToken: any):Observable<any>{
    return this._http.post<any>('http://localhost:8080/api/authenticate/fb', {fbtoken : fbToken}, httpOptions);
  }
  public loginWithGoogle(ggUserInfo: any):Observable<any>{
    return this._http.post<any>('http://localhost:8080/api/authenticate/gg', {name : ggUserInfo.name, email: ggUserInfo.email, id: ggUserInfo.id }, httpOptions);
  }
  public logout(){
    this._tokenService.signOut();
  }
}
