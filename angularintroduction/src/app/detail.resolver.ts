import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';

import { User } from './models/user';
import { UserService } from './services/user.service';

@Injectable()
export class DetailResolver implements Resolve<User> {
  constructor(private userService: UserService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User {
    const id = +route.params['id'];
    if (isNaN(id)) {
      this.router.navigate(['/']);
      return undefined;
    }

    return this.userService.getById(id);
  }
}
