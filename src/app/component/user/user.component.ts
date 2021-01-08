import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';
import { LoginService } from "../../services/login.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userList: User[] = [];
  constructor(private _service: UserService, private _loginService: LoginService, private _router: Router) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this._service.getAllUsers().subscribe(
      (res: any) => {
        this.userList = res;
      },
      error => {
        if(error.status===403)
        {
          console.log("unauthenticated");
          this._router.navigate(['/login']);
        }
        else{
          console.log("Error");
        }
      }
    );
  }

  toDeletePage(id: string){
    this._router.navigate([`/deleteUser/${id}`]);
  }
  toUpdatePage(id: string) {
    this._router.navigate([`/updateUser/${id}`]);
  }
  toCreatePage(){
    this._router.navigate(['/createUser']);
  }
  toDetailPage(id: string){
    this._router.navigate([`/detailUser/${id}`]);
  }
  logOut(){
    this._loginService.logout();
    this._router.navigate(['/login']);
  }
}
