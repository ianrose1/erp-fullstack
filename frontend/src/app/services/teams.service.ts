import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import BasicUser from '../interfaces/basic-user';
import { Team } from '../interfaces/team';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  private databaseUrl: string;
  // Observables
  private teamIdSubject = new BehaviorSubject<number>(0);
  teamId$ = this.teamIdSubject.asObservable();

  private teamNameSubject = new BehaviorSubject<string>("");
  teamName$ = this.teamNameSubject.asObservable();

  private teamDescriptionSubject = new BehaviorSubject<string>("");
  teamDescription$ = this.teamDescriptionSubject.asObservable();

  private teamUsersSubject = new BehaviorSubject<BasicUser[]>([]);
  teamUsers$ = this.teamUsersSubject.asObservable();

  constructor(private http: HttpClient) {
    this.databaseUrl = "http://localhost:8080/"
  }

  // gets list of non-deleted teams for the company
  fetchTeamsFromDB(companyId: number): Observable<Team[]> {
    return this.http.get<Team[]>(this.databaseUrl + `company/${companyId}/teams`);
  }

  // Adds a new team
  addNewTeam(team: Team) {
    return this.http.post<Team>(this.databaseUrl + `teams`, team);
  }
}
