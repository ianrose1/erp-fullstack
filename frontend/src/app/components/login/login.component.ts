import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginData = {
    email: '',
    password: ''
  };

  loginFailed = false;

  closedEyePath = "assets/images/hide-eye.png";
  openEyePath = "assets/images/show-eye.png"
  iconPath = this.closedEyePath;
  inputType = "password";

  constructor(private userService: UserService, private router: Router, private navService: NavbarService) { }


  ngOnInit(): void {
    this.navService.hide();
  }

  ngOnDestroy(): void {
    this.navService.show();
  }

  loginNotAdmin() {
    this.userService.loginAsNotAdmin();
    this.router.navigate(['']);
  }

  loginAdmin() {
    this.userService.loginAsAdmin();
    this.router.navigate(['company']);
  }

  async onSubmit() {
    console.log('Form Data:', this.loginData);
    const res = await this.userService.fetchUserFromDB(this.loginData.email, this.loginData.password);
    if (res.status === 400) {
      console.log("Invalid credentials, login failed");
      this.loginFailed = true;
    } else {
      console.log("Successful login");
      if (this.userService.isAdmin()) {
        this.router.navigate(['company']);
      } else {
        this.router.navigate(['']);
      }
    }
  }

  toggleEye() {
    this.iconPath = this.iconPath === this.closedEyePath ? this.openEyePath : this.closedEyePath;
    this.inputType = this.inputType === "password" ? "text" : "password";
  }
}
