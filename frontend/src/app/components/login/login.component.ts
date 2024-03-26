import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private userService: UserService, private router: Router) {}

  loginNotAdmin(){
    this.userService.loginAsNotAdmin();
  }

  loginAdmin(){
    this.userService.loginAsAdmin();
  }

  goToUsers(){
    this.router.navigate(['users']);
  }
}
