import { User } from '../../models/user';

import { UserDto } from './dto/user.dto';

export namespace UserMapper {

  /**
   * Maps dto to model.
   * @param dto User dto.
   */
  export function fromDto(dto: UserDto): User {
    return {
      id: dto.id,
      firstName: dto.first_name,
      lastName: dto.last_name,
      email: dto.email,
      password: dto.password,
    };
  }
}
