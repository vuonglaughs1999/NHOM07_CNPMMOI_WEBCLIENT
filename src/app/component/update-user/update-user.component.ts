import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  user = new User();
  msg = "";
  constructor(private _service: UserService, private route:ActivatedRoute, private _router:Router) { }

  ngOnInit(): void {
    this.getUser(this.route.snapshot.params['id']);
  }

  getUser(id: string) {
    this._service.getUserbyID(id).subscribe(
      data => {
        this.user = data;
      },
      error => {
        this.msg = "ERROR";
      }
    );
  }

  updateUser() {
    this._service.updateUser(this.user._id,this.user).subscribe(
      data => {
        console.log("Update successfully");
        this._router.navigate(['/users']);
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
    )
  }
}
