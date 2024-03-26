import { Component, OnInit } from '@angular/core';
import { Project } from '../../interfaces/project';
import { Team } from 'src/app/interfaces/team';

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
