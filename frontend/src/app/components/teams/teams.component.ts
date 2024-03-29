import { Component, OnInit, OnDestroy } from '@angular/core';
import { Team } from '../../interfaces/team';
import { TeamsService } from 'src/app/services/teams.service';
import { Observable, Subscription, catchError, forkJoin, of } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { ProjectsService } from 'src/app/services/projects.service';
import FullUser from 'src/app/interfaces/full-user';
import BasicUser from 'src/app/interfaces/basic-user';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit, OnDestroy {
  formData = {
    name: '',
    description: '',
    member: {} as FullUser,
  };

  showFeedback: boolean = false;
  showOverlay: boolean = false;
  feedbackMessage = '';

  companyId = 0;
  allTeams: Team[] = [];
  projectsLength: number[] = [];
  newTeam: Team | undefined = undefined;
  employees: FullUser[] = [];
  selectedMembers: FullUser[] = [];
  teamsWithProjectsCount: { team: Team, projectsCount: number }[] = [];

  existingIds: number[] = [];
  randomId: number = 0;

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

    // fetch all teams by company
    this.teamsService.fetchAllTeamsByCompany(this.companyId);

    // initialize teams
    this.subscriptions.add(
      this.teamsService.allTeamsObservable().subscribe((teams) => {
        this.allTeams = teams;

        // sort teams by name
        this.allTeams.sort((a, b) => {
          // Convert team names to lowercase for case-insensitive sorting
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();

          if (nameA < nameB) {
            return -1; // Team A should come before Team B
          }
          if (nameA > nameB) {
            return 1; // Team A should come after Team B
          }
          return 0; // Team names are equal
        });

        this.subscriptions.add(
          this.isAdmin$.subscribe(isAdmin => {
            const currentUser = this.userService.getCurrentUser();
            if (currentUser && !isAdmin) {
              this.allTeams = this.allTeams.filter(team => team.users.some(user => user.id === currentUser.id));
            }
          })
        )

        this.allTeams.forEach((team) => {
          this.existingIds.push(team.id);
        });
      })

    );

    // gets all employees in company
    this.userService.fetchAllUsers()
    // initialize
    this.subscriptions.add(
      this.userService.allUsersObservable().subscribe((users) => {
        this.employees = users;
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  // posts a new team when the submit button is clicked
  async onSubmit() {
    this.feedbackMessage = "Processing...";
    this.showFeedback = true;
    const basicSelectedMembers = this.selectedMembers.map(member => this.convertUser(member))
    const basicUserDto: [BasicUser] = this.convertToDto(basicSelectedMembers);
    const res = await this.teamsService.postNewTeam(11, this.formData.name, this.formData.description, basicUserDto, this.companyId);
    if (res.status === 400) {
      console.log("Could not add new team!");
      this.feedbackMessage = "Issue creating new team, please try again later";
    } else {
      console.log("Successfully created team!");
      this.feedbackMessage = "Successfully created team!";
      this.toggleOverlay();
      await this.teamsService.fetchAllTeamsByCompany(this.companyId);
      this.formData.name = '';
      this.formData.description = '';
      this.formData.member = {} as FullUser;
      this.selectedMembers = [];
      // gets all employees in company
      this.userService.fetchAllUsers();
      // initialize
      this.subscriptions.add(
        this.userService.allUsersObservable().subscribe((users) => {
          this.employees = users;
        })
      )
    }
  }

  // converts Object[] to [Object]
  convertToDto(users: BasicUser[]): [BasicUser] {
    const dto: [BasicUser] = [{} as BasicUser];
    for (let user of users) {
      const basicUser: BasicUser = {
        id: user.id,
        profile: user.profile,
        isAdmin: user.isAdmin,
        active: user.active,
        status: user.status
      };
      console.log(basicUser);
      dto.push(basicUser);
    }
    dto.shift();
    return dto;
  }

  // display team's projects
  OnClickTeam(teamId: number) {
    this.projectsService.updateTeamId(teamId);
  }

  removeMember(removedTeamMember: FullUser) {
    const index = this.selectedMembers.findIndex(member => member === removedTeamMember);
    if (index !== -1) {
      this.selectedMembers.splice(index, 1);
      this.employees.push(removedTeamMember);
    }
  }

  // add members to new team
  handleMemberSelection() {
    if (!this.selectedMembers.includes(this.formData.member)) {
      this.selectedMembers.push(this.formData.member);
      this.employees = this.employees.filter(emp => emp !== this.formData.member);
      console.log(this.employees);
    }
  }

  // converts full user to basic user
  convertUser(user: FullUser): BasicUser {
    const newUser: BasicUser = {
      id: user.id,
      profile: user.profile,
      isAdmin: user.admin,
      active: user.active,
      status: user.status
    };
    return newUser;
  }

  // Function to check if an employee has already been selected
  isEmployeeSelected(employee: FullUser): boolean {
    return this.selectedMembers.includes(employee);
  }

  generateRandomId(): number {
    const min = 1;
    const max = 1000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  isUnique(id: number, existingIds: number[]): boolean {
    return !existingIds.includes(id);
  }

  getRandomUniqueID(existingIds: number[]): number {
    let randomId = this.generateRandomId();
    // Keep generating new IDs until a unique one is found
    while (!this.isUnique(randomId, existingIds)) {
      randomId = this.generateRandomId();
    }
    return randomId;
  }

  // bring new team overlay on screen
  toggleOverlay() {
    this.showFeedback = false;
    this.showOverlay = !this.showOverlay;
  }
}
