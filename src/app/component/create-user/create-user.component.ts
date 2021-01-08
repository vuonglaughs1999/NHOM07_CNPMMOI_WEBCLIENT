import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  newUser = new User();
  msg="";
  constructor(private _service: UserService, private _router:Router) 
  { 

  }

  ngOnInit(): void {
  }
  createUser(){
    this._service.createUser(this.newUser).subscribe(
      data => {
        if(data.success){
          console.log("Create successfully");
          this._router.navigate(['/users']);
        }
        else{
          console.log(data.msg);
          this.msg = data.msg;
        }
      },
      error => {
        if(error.status===403)
        {
          console.log("unauthenticated");
          this._router.navigate(['/login']);
        }
        else{
          this.msg = "Error";
        }
      }
    );
  }
}
