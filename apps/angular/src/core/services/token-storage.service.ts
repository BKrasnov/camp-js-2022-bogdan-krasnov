import { concat, defer, mapTo, Observable, race, ReplaySubject, tap, shareReplay } from 'rxjs';
import { Injectable } from '@angular/core';

import { Token } from '../models/token';

import { LocalStorageService } from './local-storage.service';

const TOKEN_STORAGE_KEY = 'auth-token';

/** Token storage service. */
@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {

  private readonly token$: Observable<Token | null>;

  private readonly tokenValue$ =
    new ReplaySubject<Token | null>(1);

  public constructor(private readonly storageService: LocalStorageService) {
    this.token$ = this.initTokenStream();
  }

  /** Save token.
   * @param token Token to save.
   */
  public saveToken(token: Token): Observable<Token> {
    return defer(() =>
      this.storageService.save(TOKEN_STORAGE_KEY, token)).pipe(
      tap(() => this.tokenValue$.next(token)),
      mapTo(token),
    );
  }

  /**
   * Gets current token.
   */
  public getToken(): Observable<Token | null> {
    return this.token$;
  }

  /**
   * Deletes token from storage.
   */
     public clearToken(): Observable<void> {
      return defer(() =>
        this.storageService.delete(TOKEN_STORAGE_KEY)).pipe(tap(() => this.tokenValue$.next(null)));
    }

  private initTokenStream(): Observable<Token | null> {
    const tokenChange$ = this.tokenValue$;
    const tokenFromStorage$ = concat(
      defer(() =>
        this.storageService.get<Token>(TOKEN_STORAGE_KEY)),
      tokenChange$,
    );

    return race(tokenChange$, tokenFromStorage$).pipe(
      shareReplay({ refCount: true, bufferSize: 1 }),
    );
  }
}
