import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeamsComponent } from './teams/teams.component';
import { ProjectsComponent } from './projects/projects.component';
import { SelectCompanyComponent } from './select-company/select-company.component';
import { DropdownMenuComponent } from './dropdown-menu/dropdown-menu.component';
import { OverlayFormComponent } from './overlay-form/overlay-form.component';
import { Routes } from '@angular/router';

const routes: Routes = [
  { path: "teams", component: TeamsComponent },
  { path: "projects", component: ProjectsComponent },
  { path: "select-company", component: SelectCompanyComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TeamsComponent,
    ProjectsComponent,
    SelectCompanyComponent,
    DropdownMenuComponent,
    OverlayFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
