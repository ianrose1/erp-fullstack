import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import axios from 'axios';
import User from 'src/app/models/User';
import UserFull from 'src/app/models/UserFull';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private isLoggedInSubject = new BehaviorSubject<boolean>(true);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private isAdminSubject = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdminSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<User | undefined>(undefined);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() { }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.getValue();
  }

  isLoggedInObservable(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  isAdmin(): boolean {
    return this.isAdminSubject.getValue();
  }

  isAdminObservable(): Observable<boolean> {
    return this.isAdminSubject.asObservable();
  }

  updateCurrentUser(newUser: UserFull | undefined) {
    const convertedUser: User | undefined = undefined;
    this.currentUserSubject.next(convertedUser);
  }

  async fetchUserFromDB(username: string, password: string) {
    try {
      const response = await axios.post('/users/login', {
        username,
        password,
      });

      // TODO: Perform check on response to make sure user logged in
      console.log('User logged in successfully:', response.data);

      this.updateCurrentUser(response.data);

      return {status: 200, ...response.data};
      
    } catch (error) {
      switch (error) {
        case "No User":
          console.log("Placeholder: Username Not Found");
          break;
        case "Incorrect Password":
          console.log("Placeholder: Incorrect Password");
          break;
        default:
          console.log("Unknown error occured");
          break;
      }
      console.error('Login error message:', error);

      this.updateCurrentUser(undefined);

      return {status: 400}; 
    }

  };

  async authenticate(username: string, password: string) {
    const response = await this.fetchUserFromDB(username, password);

    if (response.status === 400) {
      this.isLoggedInSubject.next(false);
      this.isAdminSubject.next(false);
      return;
    } else {
      this.isLoggedInSubject.next(true);
    }
    
    if (response.isAdmin) {
      this.isAdminSubject.next(true);
    } else {
      this.isAdminSubject.next(false);
    }
    return;
  }

  logout() {
    this.isLoggedInSubject.next(false);
    this.isAdminSubject.next(false);
  }
}
