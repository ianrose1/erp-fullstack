import { Component, OnInit } from '@angular/core';
import { Projects } from '../interfaces/projects';
import { Teams } from 'src/app/interfaces/teams';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Admin
    // get all projects

    // Worker
    // get worker projects
  }

  onClickNewProject() {
    // Display overlay form to make new project
  }

  onClickEditProject() {
    // Display overlay form to edit that project
  }
}
