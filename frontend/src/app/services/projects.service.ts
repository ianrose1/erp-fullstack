import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import axios from 'axios';
import { Team } from 'src/app/interfaces/team';
import { Project } from 'src/app/interfaces/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  // Observables
  private projectIdSubject = new BehaviorSubject<number>(0);
  projectId$ = this.projectIdSubject.asObservable();

  private projectNameSubject = new BehaviorSubject<string>("");
  projectName$ = this.projectNameSubject.asObservable();

  private projectDescriptionSubject = new BehaviorSubject<string>("");
  projectDescription$ = this.projectDescriptionSubject.asObservable();

  private projectActiveSubject = new BehaviorSubject<boolean>(false);
  projectActive$ = this.projectActiveSubject.asObservable();

  private projectTeamsSubject = new BehaviorSubject<Team[]>([]);
  projectTeams$ = this.projectTeamsSubject.asObservable();

  constructor() { }

  // get request for projects
  async getProjects(companyId: number, teamId: number) {
    try {
      const response = await axios.get(`/company/${companyId}/teams/${teamId}/projects`);
    }
    catch (error) {
      console.error("Error fetching projects:", error);
    }
  }

}
