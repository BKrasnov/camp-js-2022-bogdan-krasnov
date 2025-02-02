import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AppConfigService } from '../services/app-config.service';

/** Interceptor to add Api Key in HTTP header. */
@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  public constructor(private readonly appConfigService: AppConfigService) {}

  /** @inheritdoc */
  public intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const apiKeyReq = req.clone({
      headers: req.headers.set(
        'Api-Key',
        this.appConfigService.apiKey ? this.appConfigService.apiKey : '',
      ),
    });
    return next.handle(apiKeyReq);
  }
}
