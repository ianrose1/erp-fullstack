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

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.fetchAllUsers();
  }

}
