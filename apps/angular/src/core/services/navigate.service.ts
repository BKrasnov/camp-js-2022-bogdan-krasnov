import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/** Url service. */
@Injectable({
  providedIn: 'root',
})
export class NavigateService {

  public constructor(
    private readonly router: Router,
  ) {}

  /** Redirect after authorization. */
  public async redirectAfterAuthorization(): Promise<void> {
    const DEFAULT_REDIRECT_URL = '/';
    const route = this.router.createUrlTree([DEFAULT_REDIRECT_URL]);
    await this.router.navigateByUrl(route);
  }
}
