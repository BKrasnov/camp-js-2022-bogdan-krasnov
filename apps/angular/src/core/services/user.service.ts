import { Injectable } from '@angular/core';
import { Observable, switchMap, throwError, first, catchError, of, mapTo, map } from 'rxjs';

import { Login } from '../models/login';
import { User } from '../models/user';

import { NavigateService } from './navigate.service';

import { AuthService } from './auth.service';
import { TokenStorageService } from './token-storage.service';

/** Stateful service for storing/managing information about the current user. */
@Injectable({
  providedIn: 'root',
})
export class UserService {

  private readonly currentUser$: Observable<User | null>;

  private readonly isLoggedIn$: Observable<boolean>;

  public constructor(
    private readonly authService: AuthService,
    private readonly tokenStorageService: TokenStorageService,
    private readonly navigateService: NavigateService,
  ) {
    this.currentUser$ = this.initCurrentUser();
    this.isLoggedIn$ = this.currentUser$.pipe(map(user => user !== null));
  }

  /** Login a user with email and password.
   * @param loginData Login data.
   */
  public login(loginData: Login): Observable<void> {
    return this.authService.login(loginData)
      .pipe(
        switchMap(() => this.isLoggedIn$),
        map(() => true),
        switchMap(() => this.navigateService.redirectAfterAuthorization()),
      );
  }

  /** Login a user with email and password.
   * @param userData Login data.
   */
  public register(userData: User): Observable<void> {
    return this.authService.register(userData)
      .pipe(
        switchMap(() => this.isLoggedIn$),
        map(() => true),
        switchMap(() => this.navigateService.redirectAfterAuthorization()),
      );
  }

  /** Refreshes access token. */
  public refresh(): Observable<void> {
    return this.tokenStorageService.getToken().pipe(
      first(),
      switchMap(token =>
        token !== null ?
          this.authService.refreshToken(token) :
          throwError(() => new Error('Unauthorized'))),
      catchError(() =>
        this.tokenStorageService.clearToken()),
      switchMap(newToken => newToken ?
        this.tokenStorageService.saveToken(newToken) :
        of(null)),
      mapTo(void 0),
    );
  }

  /** Is the user logged in. */
  public isLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$;
  }

  private initCurrentUser(): Observable<User | null> {
    return this.tokenStorageService.getToken().pipe(
      switchMap(token => token ? this.getUser() : of(null)),
    );
  }

  private getUser(): Observable<User | null> {
    return this.authService.getUser();
  }
}
