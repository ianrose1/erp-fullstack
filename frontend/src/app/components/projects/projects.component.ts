import { Component, OnInit, OnDestroy } from '@angular/core';
import { Project } from '../../interfaces/project';
import { Team } from 'src/app/interfaces/team';
import { Observable, Subscription } from 'rxjs';
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
  projectId = 0;
  currentTeam: Team | undefined = undefined;
  allProjects: Project[] = [];
  newProject: Project | undefined = undefined;

  formData = {
    name: '',
    description: '',
    active: ''
  };
  showOverlay = false;
  showFeedback = false;
  feedbackMessage = '';
  action = '';

  isAdmin$: Observable<boolean> = this.userService.isAdminObservable();

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
    this.projectsService.fetchAllProjectsByTeam(this.teamId);

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
  async onSubmit() {
    switch (this.action) {
      case "edit":
        await this.edit();
        break;
      case "create":
        await this.create();
        break;
      default:
        break;
    }
  }

  // creates a new project
  async create() {
    console.log('Form Data:', this.formData);
    this.feedbackMessage = "Processing...";
    this.showFeedback = true;
    const { name, description, active } = this.formData;
    if (this.currentTeam) {
      const res = await this.projectsService.postNewProject(-1, name, description, true, this.currentTeam);
      if (res.status === 400) {
        console.log("Could not add new project!");
        this.feedbackMessage = "Issue creating new project, please try again later";
      } else {
        console.log("Successfully created project!");
        this.feedbackMessage = "Successfully created project!";
        await this.projectsService.fetchAllProjectsByTeam(this.currentTeam.id);
      }
    }
  }

  // edits a current project
  async edit() {
    console.log('Form Data:', this.formData);
    this.feedbackMessage = "Processing...";
    this.showFeedback = true;
    const { name, description, active } = this.formData;
    const isActive = active === "true" ? true : false;
    if (this.currentTeam) {
      const res = await this.projectsService.updateProject(this.projectId, -1, name, description, true, this.currentTeam);
      if (res.status === 400) {
        console.log("Could not update project!");
        this.feedbackMessage = "Issue updating project, please try again later";
      } else {
        console.log("Successfully updated project!");
        this.feedbackMessage = "Successfully updated project!";
        await this.projectsService.fetchAllProjectsByTeam(this.currentTeam.id);
      }
    }
  }

  // bring new team overlay on screen
  toggleOverlay(action: string = "", project: Project | undefined) {
    if (project) {
      this.formData = {
        name: project.name,
        description: project.description,
        active: project.active ? 'true' : 'false'
      };
      this.projectId = project.id;
    }
    this.action = action;
    this.showOverlay = !this.showOverlay;
  }
}
