import { Component, OnInit } from '@angular/core';
import { Teams } from '../interfaces/teams';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Admin
    // get all teams

    // Worker
    // get all worker teams
  }

  onClickNewTeam() {
    // Display overlay form to make new team
  }

}
