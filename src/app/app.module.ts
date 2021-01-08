import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from '../_helpers/auth.interceptor';
import { UserComponent } from './component/user/user.component';
import { UpdateUserComponent } from './component/update-user/update-user.component';
import { DeleteUserComponent } from './component/delete-user/delete-user.component';
import { DetailsUserComponent } from './component/details-user/details-user.component';
import { CreateUserComponent } from './component/create-user/create-user.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';


const google_oauth_client_id: string = "104872694801-2aeuhoij52c5p0h64qd08r2n91cepsu8.apps.googleusercontent.com"

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    CreateUserComponent,
    UpdateUserComponent,
    DeleteUserComponent,
    DetailsUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    SocialLoginModule
  ],
  providers: [
    authInterceptorProviders,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '104872694801-2aeuhoij52c5p0h64qd08r2n91cepsu8.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
