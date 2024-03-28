import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import FullUser from 'src/app/interfaces/full-user';
import Profile from 'src/app/interfaces/profile';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  allUsers$: Observable<FullUser[]> = this.userService.allUsersObservable();

  formMode: string = "";
  userId: number = -1;

  formData = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmation: '',
    admin: ''
  };

  showOverlay = false;
  showFeedback = false;
  feedbackMessage = '';

  constructor(private userService: UserService) { }
  ngOnInit(): void {
    this.userService.fetchAllUsers();
  }

  async onSubmit() {
    console.log('Form Data:', this.formData);
    this.feedbackMessage = "Processing...";
    this.showFeedback = true;

    const { firstname, lastname, email, password, confirmation, admin } = this.formData;
    if (this.formMode === "create") {
      if (!firstname || !lastname || !email || !password || !confirmation || !admin) {
        console.log("All fields are required");
        this.feedbackMessage = "All fields are required";
        return;
      }
    } else {
      if (!firstname || !lastname || !email || !admin) {
        console.log("All fields are required");
        this.feedbackMessage = "All fields are required";
        return;
      }
    }

    if (this.formMode !== "delete" && password !== confirmation) {
      console.log("Passwords don't match");
      this.feedbackMessage = "Passwords don't match";
      return;
    }

    switch (this.formMode) {
      case "create":
        await this.create()
        break;
      case "edit":
        await this.edit();
        break;
      case "delete":
        await this.delete();
        break;
      default:
        break;
    }
    this.toggleOverlay();
  }

  async create() {
    console.log('Form Data:', this.formData);
    this.feedbackMessage = "Processing...";
    this.showFeedback = true;
    const { firstname, lastname, email, password, admin } = this.formData;
    const profile: Profile = { firstname, lastname, email, phone: "" }
    const isAdmin = admin === "true" ? true : false;
    console.log("form isAdmin: ", isAdmin)
    const res = await this.userService.createNewUser(profile, password, isAdmin);
    if (res.status === 400) {
      console.log("Could not add new user!");
      this.feedbackMessage = "Issue creating new user, please try again later";
    } else {
      console.log("Successfully created user!");
      this.feedbackMessage = "Successfully created user!";
      await this.userService.fetchAllUsers();
    }

  }

  async edit() {
    console.log('Form Data:', this.formData);
    this.feedbackMessage = "Processing...";
    this.showFeedback = true;
    const { firstname, lastname, email, password, admin } = this.formData;
    const profile: Profile = { firstname, lastname, email, phone: "" }
    const isAdmin = admin === "true" ? true : false;
    console.log("form isAdmin: ", isAdmin)

    const userId = this.userId;
    const res = await this.userService.editUser(profile, password, isAdmin, userId);
    if (res.status === 400) {
      console.log("Could not edit user!");
      this.feedbackMessage = "Issue editing user, please try again later";
    } else {
      console.log("Successfully edited user!");
      this.feedbackMessage = "Successfully edited user!";
      await this.userService.fetchAllUsers();
    }

  }

  async delete() {
    console.log('Form Data:', this.formData);
    this.feedbackMessage = "Processing...";
    this.showFeedback = true;
    const res = await this.userService.deleteUser(this.userId);
    if (res.status === 400) {
      console.log("Could not add new user!");
      this.feedbackMessage = "Issue creating new user, please try again later";
    } else {
      console.log("Successfully created user!");
      this.feedbackMessage = "Successfully created user!";
      await this.userService.fetchAllUsers();
    }

  }

  toggleOverlay(
    formMode: string = "",
    userId: number = -1,
    formDataObj:
      {
        firstname: any,
        lastname: any,
        email: any,
        password: any,
        confirmation: any,
        admin: any
      } = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmation: '',
        admin: ''
      }
  ) {
    this.formMode = formMode;
    this.formData = formDataObj;
    
    console.log("Updated formData: ", this.formData);
    this.userId = userId;
    
    if (formMode === "delete") {
      this.feedbackMessage = "Click Submit to delete this user";
      this.showFeedback = true;
    } else {
      this.showFeedback = false;
    }
    this.showOverlay = !this.showOverlay;
  }

  // setFormData(firstname: string, lastname: string, email: string, password: string, confirmation: string, admin: boolean) {
  //   this.formData = { firstname, lastname, email, password, confirmation, admin };
  // }

}
