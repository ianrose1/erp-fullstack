import { Component, OnInit, OnDestroy } from '@angular/core';
import { Team } from '../../interfaces/team';
import { TeamsService } from 'src/app/services/teams.service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit, OnDestroy {
  companyId = 0;
  allTeams: Team[] = [];
  newTeam: Team | undefined = undefined;

  constructor(private teamsService: TeamsService, private userService: UserService) { }

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
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  // posts a new team when the submit button is clicked
  onSubmit() {
    // post new team
    this.teamsService.postNewTeam();

    this.subscriptions.add(
      this.teamsService.teamObservable().subscribe((team) => {
        this.newTeam = team;
      })
    )
  }
}
