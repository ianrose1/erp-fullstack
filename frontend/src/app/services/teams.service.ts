import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Team } from '../interfaces/team';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  // Observables
  private teamSubject = new BehaviorSubject<Team | undefined>(undefined);
  team$ = this.teamSubject.asObservable();

  private allTeamsSubject = new BehaviorSubject<Team[]>([]);
  allTeams$ = this.allTeamsSubject.asObservable();

  constructor() { }

  // getters
  allTeamsObservable(): Observable<Team[]> {
    return this.allTeamsSubject.asObservable();
  }

  teamObservable(): Observable<Team | undefined> {
    return this.teamSubject.asObservable();
  }

  // gets all teams from provided company
  async fetchAllTeamsByCompany(companyId: number) {
    try {
      const response = await axios.get(`http://localhost:8080/company/${companyId}/teams`);
      console.log("All Teams By Company Response Data: ", response.data);
      this.allTeamsSubject.next(response.data);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  }

  // gets all teams
  async fetchAllTeams() {
    try {
      const response = await axios.get('http://localhost:8080/team');
      console.log("All Teams Response Data: ", response.data);
      // TODO: Set up behavior subject for all teams
    }
    catch (error) {
      console.error("Error fetching teams:", error);
    }
  }

  // gets team by id
  async fetchTeamById(teamId: number) {
    try {
      const response = await axios.get(`http://localhost:8080/team/${teamId}`);
      console.log("Team Response Data: ", response.data);
      this.teamSubject.next(response.data);
    }
    catch (error) {
      console.error("Error fetching team:", error);
    }
  }

  // creates a new team
  async postNewTeam() {
    try {
      const response = await axios.post(`http://localhost:8080/team`);
      console.log("Team Response Data: ", response.data);
      this.teamSubject.next(response.data);
    }
    catch (error) {
      console.error("Error fetching team:", error);
    }
  }
}
