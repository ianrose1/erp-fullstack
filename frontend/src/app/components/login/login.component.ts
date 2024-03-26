import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  loginFailed = false;

  constructor(private userService: UserService, private router: Router) {}

  loginNotAdmin(){
    this.userService.loginAsNotAdmin();
    this.router.navigate(['']);
  }

  loginAdmin(){
    this.userService.loginAsAdmin();
    this.router.navigate(['']);
  }

  async onSubmit() {
    console.log('Form Data:', this.loginData);
    const res = await this.userService.fetchUserFromDB(this.loginData.email, this.loginData.password);
    if (res.status === 400) {
      console.log("Invalid credentials, login failed");
      this.loginFailed = true;
    } else {
      console.log("Sucessful login");
      this.router.navigate(['']);
    }
  }
}
