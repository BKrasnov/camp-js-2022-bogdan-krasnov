import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserService } from '../services/user.service';

/** Guard prevents a current user from accessing a route in case if they are authorized. */
@Injectable({
  providedIn: 'root',
})
export class AuthorizedGuard implements CanActivate {
  public constructor(
    private readonly userService: UserService,
    private readonly router: Router,
  ) {}

  /** Determine if /auth route can be activated. */
  public canActivate(): Observable<boolean | UrlTree> {
    return this.userService.isLoggedIn().pipe(
      map(isAuthorized => (isAuthorized ? this.router.parseUrl('/') : true)),
    );
  }
}
