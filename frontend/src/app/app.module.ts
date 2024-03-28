import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { TeamsComponent } from './components/teams/teams.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SelectCompanyComponent } from './components/select-company/select-company.component';
import { DropdownMenuComponent } from './components/dropdown-menu/dropdown-menu.component';
import { OverlayFormComponent } from './components/overlay-form/overlay-form.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

// const routes: Routes = [
//   { path: "teams", component: TeamsComponent },
//   { path: "projects", component: ProjectsComponent },
//   { path: "select-company", component: SelectCompanyComponent }
// ];


@NgModule({
  declarations: [
    AppComponent,
    TeamsComponent,
    ProjectsComponent,
    SelectCompanyComponent,
    DropdownMenuComponent,
    OverlayFormComponent,
    HomeComponent,
    LoginComponent,
    UsersComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatTableModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
