import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
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

  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
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
    } else if (this.formMode === "password") {
      if (!password || !confirmation) {
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

    if ((this.formMode === 'edit' || this.formMode === 'create') && !this.emailRegex.test(email)) {
      console.log("Please enter a valid email");
      this.feedbackMessage = "Please enter a valid email";
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
      case "password":
        await this.updatePassword();
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
      console.log("Could not delete user!");
      this.feedbackMessage = "Issue deleting user, please try again later";
    } else {
      console.log("Successfully deleted user!");
      this.feedbackMessage = "Successfully deleted user!";
      await this.userService.fetchAllUsers();
    }
  }

  async updatePassword() {
    console.log('Form Data:', this.formData);
    this.feedbackMessage = "Processing...";
    this.showFeedback = true;
    const password: string = this.formData.password
    const res = await this.userService.updatePassword(this.userId, password);
    if (res.status === 400) {
      console.log("Could not update password!");
      this.feedbackMessage = "Issue updating password, please try again later";
    } else {
      console.log("Successfully updated password!");
      this.feedbackMessage = "Successfully updated password!";
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
      this.feedbackMessage = `Click Submit to delete user '${this.formData.firstname}  ${this.formData.lastname}'`;
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
