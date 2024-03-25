import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from './guards/logged-in.guard';
import { AdminGuard } from './guards/admin.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { NotLoggedInGuard } from './guards/not-logged-in.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [NotLoggedInGuard]},
  {path: '', component: HomeComponent, canActivate: [LoggedInGuard]},
  // {path: 'home', component: HomeComponent, canActivate: [LoggedInGuard]},
  {path: 'users', component: UsersComponent, canActivate: [LoggedInGuard, AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
