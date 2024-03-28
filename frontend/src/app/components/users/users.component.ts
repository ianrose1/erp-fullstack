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

  formData = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmation: '',
    admin: false
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
    if (password !== confirmation) {
      console.log("Passwords don't match");
      this.feedbackMessage = "Passwords don't match";
      this.showFeedback = true;
    } else {
      const profile: Profile = { firstname, lastname, email, phone: "" }
      const isAdmin = admin;
      console.log("form isAdmin: ", isAdmin)
      const res = await this.userService.createNewUser(profile, password, isAdmin);
      if (res.status === 400) {
        console.log("Could not add new user!");
        this.feedbackMessage = "Issue creating new user, please try again later";
      } else {
        console.log("Successfully created user!");
        this.feedbackMessage = "Successfully created user!";
        await this.userService.fetchAllUsers();
        this.toggleOverlay();
      }
    }
  }

  toggleOverlay() {
    this.showFeedback = false;
    this.showOverlay = !this.showOverlay;
  }

}
