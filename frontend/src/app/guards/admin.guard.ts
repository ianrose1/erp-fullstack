import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';


export const AdminGuard = () => {
    const userService: UserService = inject(UserService);
    const router: Router = inject(Router);
    

    console.log("Admin Guard: ", userService.isAdmin());
    if (userService.isAdmin()) {
      return true;
    } else {
      router.navigate([''])
      return false;
    }
  }
  
