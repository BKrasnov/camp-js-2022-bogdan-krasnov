import { Injectable } from '@angular/core';

import { Login } from '../../models/login';

import { IMapper } from './mappers';

import { LoginDto } from './dto/login.dto';

/** Login mapper. */
@Injectable({
  providedIn: 'root',
})
export class LoginDataMapper
implements IMapper<LoginDto, Login> {
  /** @inheritdoc */
  public toDto(data: Login): LoginDto {
    return {
      email: data.email,
      password: data.password,
    };
  }

  /** @inheritdoc */
  public fromDto(dto: LoginDto): Login {
    return {
      email: dto.email,
      password: dto.password,
    };
  }
}
