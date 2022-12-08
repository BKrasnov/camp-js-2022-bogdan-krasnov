import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap } from 'rxjs';

import { Login } from '../models/login';
import { Token } from '../models/token';

import { User } from './../models/user';

import { AppConfigService } from './app-config.service';
import { TokenDto } from './mappers/dto/token.dto';
import { UserDto } from './mappers/dto/user.dto';
import { LoginDataMapper } from './mappers/login-data.mapper';
import { TokenDataMapper } from './mappers/token-data.mapper';
import { UserMapper } from './mappers/user.mapper';
import { TokenStorageService } from './token-storage.service';

const AUTH_LOGIN = 'auth/login/';
const AUTH_REGISTER = 'auth/register/';
const AUTH_REFRESH = 'auth/token/refresh/';
const AUTH_USER = 'users/profile/';

/** Anime service. */
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly userUrl: URL;

  private readonly loginUrl: URL;

  private readonly registerUrl: URL;

  private readonly refreshTokenUrl: URL;

  public constructor(
    appConfig: AppConfigService,
    private readonly httpClient: HttpClient,
    private readonly tokenDataMapper: TokenDataMapper,
    private readonly tokenStorageService: TokenStorageService,
    private readonly loginDataMapper: LoginDataMapper,
  ) {
    this.userUrl = new URL(AUTH_USER, appConfig.apiUrl);
    this.loginUrl = new URL(AUTH_LOGIN, appConfig.apiUrl);
    this.registerUrl = new URL(AUTH_REGISTER, appConfig.apiUrl);
    this.refreshTokenUrl = new URL(AUTH_REFRESH, appConfig.apiUrl);
  }

  /**
   * Login a user with email and password.
   * @param loginData Login data.
   */
  public login(loginData: Login): Observable<Token> {
    return this.httpClient.post<TokenDto>(
      this.loginUrl.toString(),
      this.loginDataMapper.toDto(loginData),
    ).pipe(
      switchMap(token => this.tokenStorageService.saveToken(token)),
      map(tokenDto => this.tokenDataMapper.fromDto(tokenDto)),
    );
  }

  /** Register a user with email and password.
   * @param user User data.
   */
  public register(user: User): Observable<Token> {
    return this.httpClient.post<TokenDto>(
      this.registerUrl.toString(),
      user,
    ).pipe(
      switchMap(token => this.tokenStorageService.saveToken(token)),
      map(dto => this.tokenDataMapper.fromDto(dto)),
    );
  }

  /**
   * Refresh user's token.
   * @param token Token.
   */
  public refreshToken(token: Token): Observable<Token> {
    return this.httpClient.post<TokenDto>(
      this.refreshTokenUrl.toString(),
      this.tokenDataMapper.toDto(token),
    ).pipe(
      map(refreshedToken => this.tokenDataMapper.fromDto(refreshedToken)),
    );
  }

  /** Get user. */
  public getUser(): Observable<User | null> {
    return this.httpClient.get<UserDto>(this.userUrl.toString())
      .pipe(
        map(data => UserMapper.fromDto(data)),
        catchError(() => of(null)),
      );
  }
}
