import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { UserComponent } from './component/user/user.component';
import { CreateUserComponent } from './component/create-user/create-user.component';
import { UpdateUserComponent } from './component/update-user/update-user.component';
import { DeleteUserComponent } from './component/delete-user/delete-user.component';
import { DetailsUserComponent } from './component/details-user/details-user.component';

const routes: Routes = [
  {path:`login`,component:LoginComponent},
  {path:`users`,component:UserComponent},
  {path:`createUser`, component: CreateUserComponent },
  {path:`updateUser/:id`, component: UpdateUserComponent },
  {path:`deleteUser/:id`, component: DeleteUserComponent },
  {path:`detailUser/:id`, component: DetailsUserComponent },
  {path: ``, redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
