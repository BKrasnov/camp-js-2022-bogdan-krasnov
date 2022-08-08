import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialExampleModule } from '../../../material/material.module';

import { AuthRoutingModule } from '../auth/auth-routing.module';

import { AuthComponent } from './auth.component';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

/** Anime module. */
@NgModule({
  declarations: [LoginComponent, RegistrationComponent, AuthComponent],
  imports: [CommonModule, AuthRoutingModule, MaterialExampleModule],
})
export class AuthModule {}
