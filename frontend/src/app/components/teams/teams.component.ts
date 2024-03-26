import { Component, OnInit, OnDestroy } from '@angular/core';
import { Team } from '../../interfaces/team';
import { TeamsService } from 'src/app/services/teams.service';
import { Observable, Subscription, from, map } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit, OnDestroy {
  private userCompanyId: number = 0;
  teams: Team[] = [];

  private subscriptions = new Subscription();

  constructor(private teamsService: TeamsService, private userService: UserService) { }

  ngOnInit(): void {
    // gets the user's current company id
    this.subscriptions.add(
      this.userService.currentCompanyId$.subscribe((id) => {
        this.userCompanyId = id;
      })
    );
    // gets teams observable from database based on company user selected
    this.subscriptions.add(
      this.teamsService.fetchTeamsFromDB(this.userCompanyId).subscribe(data => {
        this.teams = data;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onClickNewTeam() {
    // Display overlay form to make new team
  }

}
