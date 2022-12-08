import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';

import { tap } from 'rxjs/operators';

import { UserService } from './../../../../core/services/user.service';

/** Login component. */
@Component({
  selector: 'camp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  /** Login form. */
  public readonly loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
  });

  /** Check login user. */
  public readonly isLoggedIn$ = this.userService.isLoggedIn();

  public constructor(
    private readonly userService: UserService,
  ) { }

  /** On submit login data. */
  public onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    this.userService.login({
      email: this.loginForm.value.email ?? '',
      password: this.loginForm.value.password ?? '',
    }).pipe(
      tap(errorMessage => {
        if (errorMessage === null) {
          return;
        }
        this.loginForm.setErrors({
          email: errorMessage,
        });
      }),
    )
      .subscribe();
  }
}
