import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, filter } from 'rxjs';
import { NavbarService } from 'src/app/services/navbar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  userName$: Observable<string> = this.userService.userNameObservable();
  isAdmin$: Observable<boolean> = this.userService.isAdminObservable();
  isVisible$: Observable<boolean> = this.navService.isVisibleObservable();
  showMenu = false;

  constructor(private userService: UserService, private router: Router, private navService: NavbarService) { }

  logout() {
    this.userService.logout();
    this.router.navigate(['login']);
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

}
