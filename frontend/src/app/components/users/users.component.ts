import { Component} from '@angular/core';
import { Observable } from 'rxjs';
import FullUser from 'src/app/interfaces/full-user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  allUsers$: Observable<FullUser[]> = this.UserService.allUsersObservable();

  constructor(private UserService: UserService) {}

}
