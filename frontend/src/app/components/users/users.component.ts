import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import FullUser from 'src/app/interfaces/full-user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  allUsers$: Observable<FullUser[]> = this.userService.allUsersObservable();

  formConfig = [
    { name: 'first name', type: 'text' },
    { name: 'last name', type: 'text' },
    { name: 'email', type: 'text' },
    { name: 'password', type: 'text' },
    { name: 'confirm password', type: 'text' },
    { name: 'Make user an admin role?', type: 'dropdown', options: ['Pick an option', 'Option 1', 'Option 2'] }
    // Add more fields as required
  ];

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.fetchAllUsers();
  }

}
