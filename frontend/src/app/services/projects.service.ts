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
  private projectsSubject = new BehaviorSubject<Project[]>([]);
  projectsTeams$ = this.projectsSubject.asObservable();

  private projectSubject = new BehaviorSubject<Project | undefined>(undefined);
  project$ = this.projectSubject.asObservable();

  private teamIdSubject = new BehaviorSubject<number>(0);
  teamId$ = this.teamIdSubject.asObservable();

  constructor() { }

  // getters
  projectsObservable(): Observable<Project[]> {
    return this.projectsSubject.asObservable();
  }

  projectObservable(): Observable<Project | undefined> {
    return this.projectSubject.asObservable();
  }

  currTeamIdObservable(): Observable<number> {
    return this.teamIdSubject.asObservable();
  }

  updateTeamId(teamId: number) {
    this.teamIdSubject.next(teamId);
  }

  // get projects by company id and team id
  async fetchAllProjectsByTeamAndCompany(companyId: number, teamId: number) {
    try {
      const response = await axios.get(`http://localhost:8080/company/${companyId}/teams/${teamId}/projects`);
      console.log("All Projects By Company/Team Response Data: ", response.data);
      this.projectsSubject.next(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }

  // get projects
  async fetchAllProjects() {
    try {
      const response = await axios.get(`http://localhost:8080/projects`);
      console.log("All Project's Response Data: ", response.data);
      this.projectsSubject.next(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }

  // get projects by team id
  async fetchAllProjectsByTeam(teamId: number) {
    try {
      const response = await axios.get(`http://localhost:8080/projects/${teamId}`);
      console.log("All Projects By Team Response Data: ", response.data);
      this.projectsSubject.next(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }

  // get project by project id
  async fetchProjectByID(projectId: number) {
    try {
      const response = await axios.get(`http://localhost:8080/projects/project/${projectId}`);
      console.log("Project By Id Response Data: ", response.data);
      this.projectSubject.next(response.data);
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  }

  // post new project
  async postNewProject(id: number, name: string, description: string, active: boolean, team: Team) {
    try {
      const response = await axios.post(`http://localhost:8080/projects`, {
        name,
        description,
        active,
        team
      });
      console.log("Project Response Data: ", response.data);
      this.projectSubject.next(response.data);
      return { status: 200, ...response.data };
    }
    catch (error) {
      console.error("Error fetching project:", error);
      return { status: 400 };
    }
  }

  async updateProject(projectId: number, id: number, name: string, description: string, active: boolean, team: Team) {
    try {
      const response = await axios.patch(`http://localhost:8080/projects/project/${projectId}`, {
        name,
        description,
        active,
        team
      });
      console.log("Project Response Data: ", response.data);
      this.projectSubject.next(response.data);
      return { status: 200, ...response.data };
    }
    catch (error) {
      console.error("Error updating project:", error);
      return { status: 400 };
    }
  }
}
