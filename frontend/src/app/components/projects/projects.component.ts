import { Component, OnInit, OnDestroy } from '@angular/core';
import { Project } from '../../interfaces/project';
import { Team } from 'src/app/interfaces/team';
import { Subscription } from 'rxjs';
import { TeamsService } from 'src/app/services/teams.service';
import { UserService } from 'src/app/services/user.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  companyId = 0;
  teamId = 0;
  currentTeam: Team | undefined = undefined;
  allProjects: Project[] = [];
  newProject: Project | undefined = undefined;

  constructor(private teamsService: TeamsService, private userService: UserService, private projectsService: ProjectsService) { }

  // subscriptions
  private subscriptions = new Subscription();

  ngOnInit(): void {
    // Subscribe to current company id
    this.subscriptions.add(
      this.userService.currentCompanyIdObservable().subscribe((id) => {
        this.companyId = id;
      })
    );

    // Subscribe to current team id
    this.subscriptions.add(
      this.projectsService.currTeamIdObservable().subscribe((id) => {
        this.teamId = id;
      })
    );

    // get current team
    this.teamsService.fetchTeamById(this.teamId);

    // fetch all projects by company and team
    this.projectsService.fetchAllProjectsByTeamAndCompany(this.companyId, this.teamId);

    // initialize projects
    this.subscriptions.add(
      this.projectsService.projectsObservable().subscribe((projects) => {
        this.allProjects = projects;
      })
    );

    // initialize current team
    this.subscriptions.add(
      this.teamsService.teamObservable().subscribe((team) => {
        this.currentTeam = team;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  // posts a new team when the submit button is clicked
  onSubmit() {
    // post new project
    // TODO:"get parameters for postNewProject"
    // project name, description (input)
    // this.projectsService.postNewTeam();
  }

  // edits a project
  onSave() {
    // project name, description, active (input)
  }
}
