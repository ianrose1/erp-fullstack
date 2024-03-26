import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import BasicUser from '../interfaces/basic-user';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  // Observables
  private teamIdSubject = new BehaviorSubject<number>(0);
  teamId$ = this.teamIdSubject.asObservable();

  private teamNameSubject = new BehaviorSubject<string>("");
  teamName$ = this.teamNameSubject.asObservable();

  private teamDescriptionSubject = new BehaviorSubject<string>("");
  teamDescription$ = this.teamDescriptionSubject.asObservable();

  private teamUsersSubject = new BehaviorSubject<BasicUser[]>([]);
  teamUsers$ = this.teamUsersSubject.asObservable();

  constructor() { }

  // gets list of non-deleted teams for the company
  async fetchTeamsFromDB(companyId: number) {
    try {
      const response = await axios.get(`company/${companyId}/teams`);

    }
    catch (error) {
      console.error("Error fetching teams:", error);
    }
  }
}
