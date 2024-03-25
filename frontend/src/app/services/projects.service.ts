import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import axios from 'axios';
import { Teams } from 'src/app/interfaces/teams';
import { Projects } from 'src/app/interfaces/projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private id = new BehaviorSubject<number>(0);
  private name = new BehaviorSubject<string>("");
  private description = new BehaviorSubject<string>("");
  private active = new BehaviorSubject<boolean>(false);
  private team = new BehaviorSubject<Teams | undefined>(undefined);
  private projects = new BehaviorSubject<Projects[]>([]);

  constructor() { }

  // Observable getters for components to subscribe to
  get id$(): Observable<number> {
    return this.id.asObservable();
  }

  get name$(): Observable<string> {
    return this.name.asObservable();
  }

  get description$(): Observable<string> {
    return this.description.asObservable();
  }

  get active$(): Observable<boolean> {
    return this.active.asObservable();
  }

  get team$(): Observable<Teams | undefined> {
    return this.team.asObservable();
  }

  get projects$(): Observable<Projects[]> {
    return this.projects.asObservable();
  }

  // get request for projects
  async getProjects(companyId: number, teamId: number) {
    try {
      const response = await axios.get(`/company/${companyId}/teams/${teamId}/projects`);
      this.projects.next(response.data);
    }
    catch (error) {
      console.error("Error fetching projects:", error);
    }
  }

}
