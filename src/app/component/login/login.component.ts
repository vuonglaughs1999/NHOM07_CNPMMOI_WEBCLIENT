import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { User } from '../../model/user';
import { TokenStorageService } from '../../services/token-storage.service';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

declare var FB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  user = new User();
  msg = '';


  constructor(private zone: NgZone, private tokenService: TokenStorageService, private ggLoginService: SocialAuthService, private _service: LoginService, private _router: Router) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLoggedIn = true;
      this._router.navigate(['/users']);
    }
    (window as any).fbAsyncInit = function () {
      FB.init({
        appId: '648511682452842',
        cookie: true,
        xfbml: true,
        version: 'v9.0'
      });
      FB.AppEvents.logPageView();
    };
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode?.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    this.ggLoginService.initState.subscribe(() => {}, console.error, () => {console.log('all providers are ready')});
  }

  loginUser() {
    this._service.loginUserFromRemote(this.user).subscribe(

      data => {
        if (data.success) {
          this.tokenService.saveToken(data.token);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this._router.navigate(['/users']);
        }
        this.isLoginFailed = true;
        this.msg = "Bad credentials, please enter valid Email and Password";
      },
      error => {
        console.log(error);
      }
    );
  }

  ggLogin(){
    this.ggLoginService.signIn(GoogleLoginProvider.PROVIDER_ID).then(response => {
      this._service.loginWithGoogle({id: response.id, name: response.name, email: response.email }).subscribe(
        data => {
          if (data.success) {
            this.tokenService.saveToken(data.token);
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.zone.run(() => {
              this._router.navigate(['/users']);
            });
          }
          this.isLoginFailed = true;
          this.msg = "Login failed. Please try again.";
        },
        error => {
          console.log(error);
        }
      );
    })
  }


  fbLogin() {
    console.log("submit login to facebook");
    FB.login((response) => {
      if (response.authResponse) {
        this._service.externalLogin(response.authResponse.accessToken).subscribe(
          data => {
            if (data.success) {
              this.tokenService.saveToken(data.token);
              this.isLoginFailed = false;
              this.isLoggedIn = true;
              this.zone.run(() => {
                this._router.navigate(['/users']);
              });
            }
            this.isLoginFailed = true;
            this.msg = "Login failed. Please try again.";
          },
          error => {
            console.log(error);
          }
        );
      }
      else {
        console.log('User cancelled login');
      }
    });
  }

  gotoregistration() {
    this._router.navigate(['/registration']);
  }
}
