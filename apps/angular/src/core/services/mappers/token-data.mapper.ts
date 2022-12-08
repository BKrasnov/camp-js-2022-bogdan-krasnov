import { Injectable } from '@angular/core';

import { Token } from '../../models/token';

import { IMapper } from './mappers';

import { TokenDto } from './dto/token.dto';

/** Token mapper. */
@Injectable({
  providedIn: 'root',
})
export class TokenDataMapper
implements IMapper<TokenDto, Token> {
  /** @inheritdoc */
  public toDto(data: Token): TokenDto {
    return {
      access: data.access,
      refresh: data.refresh,
    };
  }

  /** @inheritdoc */
  public fromDto(dto: TokenDto): Token {
    return {
      access: dto.access,
      refresh: dto.refresh,
    };
  }
}
