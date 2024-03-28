import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from './guards/logged-in.guard';
import { AdminGuard } from './guards/admin.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { NotLoggedInGuard } from './guards/not-logged-in.guard';
import { SelectCompanyComponent } from './components/select-company/select-company.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { TeamsComponent } from './components/teams/teams.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [NotLoggedInGuard] },
  { path: '', component: HomeComponent, canActivate: [LoggedInGuard] },
  // {path: 'home', component: HomeComponent, canActivate: [LoggedInGuard]},
  { path: 'company', component: SelectCompanyComponent, canActivate: [LoggedInGuard, AdminGuard] },
  { path: 'projects', component: ProjectsComponent, canActivate: [LoggedInGuard] },
  { path: 'teams', component: TeamsComponent, canActivate: [LoggedInGuard] },
  { path: 'users', component: UsersComponent, canActivate: [LoggedInGuard, AdminGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
