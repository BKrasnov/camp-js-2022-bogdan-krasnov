import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthorizedGuard } from '../../../core/guards/authorized.guard';

import { RegistrationComponent } from './registration/registration.component';

import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthorizedGuard],
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    canActivate: [AuthorizedGuard],
  },
];

/** Anime routing module. */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
