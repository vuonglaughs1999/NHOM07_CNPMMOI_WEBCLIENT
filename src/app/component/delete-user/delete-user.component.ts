import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

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
  deleteUser() {
    this._service.deleteUser(this.user._id).subscribe(
      data => {
        console.log("Deleted");
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
