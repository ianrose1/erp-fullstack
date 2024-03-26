import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Team 2';
  isLoggedIn$: Observable<boolean> = this.userService.isLoggedInObservable();

  constructor(private userService: UserService) {}
}
