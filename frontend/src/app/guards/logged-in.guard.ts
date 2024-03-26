import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';


export const LoggedInGuard = () => {
    const userService: UserService = inject(UserService);
    const router: Router = inject(Router);

    if (userService.isLoggedIn()) {
      return true;
    } else {
      router.navigate(['login'])
      return false;
    }
  }
  
