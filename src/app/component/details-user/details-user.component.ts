import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.css']
})
export class DetailsUserComponent implements OnInit {

  user = new User();
  msg = "";
  constructor(private _service: UserService, private _router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getUser(this.route.snapshot.params['id'])
  }
  getUser(id: string) {
    this._service.getUserbyID(id).subscribe(
      data => {
       this.user = data
      },
      error => {
        this.msg = "ERROR";
      }
    );
  }
}
