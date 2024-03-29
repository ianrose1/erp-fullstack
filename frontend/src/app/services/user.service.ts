import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import axios from 'axios';
import UserFull from 'src/app/interfaces/full-user';
import FullUser from 'src/app/interfaces/full-user';
import Company from '../interfaces/company';
import Profile from '../interfaces/profile';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userNameSubject = new BehaviorSubject<string>("");

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private isAdminSubject = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdminSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<FullUser | undefined>(undefined);
  currentUser$ = this.currentUserSubject.asObservable();

  private allUsersSubject = new BehaviorSubject<FullUser[]>([]);
  allUsers$ = this.allUsersSubject.asObservable();

  private currentCompanyIdSubject = new BehaviorSubject<number>(-1);
  currentCompanyId$ = this.currentCompanyIdSubject.asObservable();

  private companyListSubject = new BehaviorSubject<Company[]>([]);
  companyList$ = this.companyListSubject.asObservable();

  constructor() { }

  getCurrentUser() {
    return this.currentUserSubject.value;
  }

  getCurrentCompanyId() {
    return this.currentCompanyIdSubject.value;
  }

  getFirstAndLastInitial(firstName: string, lastName: string) {
    if (!lastName) {
      return firstName;
    } else {
      const lastInitial = lastName.charAt(0).toUpperCase() + '.';
      return `${firstName} ${lastInitial}`;
    }
  }

  userNameObservable(){
    return this.userNameSubject.asObservable();
  }

  companyListObservable(){
    return this.companyListSubject.asObservable();
  }
  
  updateCurrentCompanyId(newId: number) {
    this.currentCompanyIdSubject.next(newId);
  }

  currentCompanyIdObservable() {
    return this.currentCompanyIdSubject.asObservable();
  }

  allUsersObservable(): Observable<FullUser[]> {
    return this.allUsersSubject.asObservable();
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  isLoggedInObservable(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  isAdmin(): boolean {
    return this.isAdminSubject.value;
  }

  isAdminObservable(): Observable<boolean> {
    return this.isAdminSubject.asObservable();
  }

  updateCurrentUser(newUser: UserFull | undefined) {
    console.log("newUser: ", newUser)
    this.currentUserSubject.next(newUser);
    if (newUser){
      let name: string = this.getFirstAndLastInitial(newUser.profile.firstname, newUser.profile.lastname)
      if (newUser.admin) {
        name = name + " (Admin)";
      } 
      this.userNameSubject.next(name);
      // this.userNameSubject.next(this.getFirstAndLastInitial("Pinky", "Panther"));
      this.companyListSubject.next(newUser.companies);
      const companies = newUser.companies;
      this.currentCompanyIdSubject.next(companies.length > 0 ? companies[0].id : 6);
      this.isLoggedInSubject.next(true);
      this.isAdminSubject.next(newUser.admin);
      console.log("updated admin inside update call")
    }
  }

  updatAllUsers(users: FullUser[]) {
    const sortedUsers: FullUser[] = users.sort((a: FullUser, b: FullUser) => {
      const aLastName = a.profile.lastname.toLowerCase();
      const bLastName = b.profile.lastname.toLowerCase();
      const aFirstName = a.profile.firstname.toLowerCase();
      const bFirstName = b.profile.firstname.toLowerCase();
      if (aLastName > bLastName) {
        return 1;
      } else if (aLastName < bLastName) {
        return -1;
      } else {
        // Same last name, go to first name
        if (aFirstName > bFirstName) {
          return 1;
        } else if (aFirstName < bFirstName) {
          return -1;
        } else {
          return 0;
        }
      }
    })
    this.allUsersSubject.next(sortedUsers);
  }

  async fetchAllUsers() {
    try {
      const companyId: number = this.getCurrentCompanyId();
      const response = await axios.get(`http://localhost:8080/company/${companyId}/users`)
      console.log("All Users Response Data: ", response.data);
      const users: FullUser[] = response.data
      this.updatAllUsers(users);
    } catch (error) {
        console.error("Error fetching users:", error);
    }
  }

  async fetchUserFromDB(email: string, password: string) {
    try {
      const response = await axios.post('http://localhost:8080/users/login', {
        email,
        password,
      });

      // TODO: Perform check on response to make sure user logged in
      console.log('User logged in successfully:', response.data);

      const user: FullUser = response.data;
      console.log("User: ", user);

      this.updateCurrentUser(user);

      console.log("Finished with update call");

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
    console.log("Authenticate Response: ", response)
    console.log("Authenticate Response Status: ", response.status)
    if (response.status === 400) {
      this.isLoggedInSubject.next(false);
      this.isAdminSubject.next(false);
      return;
    } else {
      this.isLoggedInSubject.next(true);
    }
    
    if (response.admin) {
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

  loginAsNotAdmin() {
    this.isLoggedInSubject.next(true);
    this.isAdminSubject.next(false);
  }

  loginAsAdmin() {
    this.isLoggedInSubject.next(true);
    this.isAdminSubject.next(true);
  }

  async createNewUser(profile: Profile, password: string, admin: boolean) {
    try {
      const companyId = this.getCurrentCompanyId();
      const response = await axios.post(`http://localhost:8080/users`, {
        credentials: {username: profile.email, password},
        profile,
        isAdmin: admin,
        companyId
      });
      console.log("Post New User Response Data: ", response.data);
      return {status: 200, ...response.data};
    }
    catch (error) {
      console.error("Error creating new user:", error);

      return {status: 400}; 
    }
  }

  async editUser(profile: Profile, password: string, admin: boolean, userId: number) {
    try {
      const companyId = this.getCurrentCompanyId();
      const response = await axios.patch(`http://localhost:8080/users/${userId}`, {
        credentials: {username: profile.email, password},
        profile,
        isAdmin: admin,
        companyId
      });
      console.log("Edit User Response Data: ", response.data);
      return {status: 200, ...response.data};
    }
    catch (error) {
      console.error("Error editing user:", error);

      return {status: 400}; 
    }
  }

  async deleteUser(userId: number) {
    try {
      const response = await axios.delete(`http://localhost:8080/users/${userId}`);
      console.log("Delete User Response Data: ", response.data);
      return {status: 200, ...response.data};
    }
    catch (error) {
      console.error("Error deleting user:", error);

      return {status: 400}; 
    }
  }

  async updatePassword(userId: number, password: string) {
    try {
      const response = await axios.patch(`http://localhost:8080/users/${userId}/reset`, {
        password
      });
      console.log("Update User Password Response Data: ", response.data);
      return {status: 200, ...response.data};
    }
    catch (error) {
      console.error("Error updating user password:", error);

      return {status: 400}; 
    }
  }





}
