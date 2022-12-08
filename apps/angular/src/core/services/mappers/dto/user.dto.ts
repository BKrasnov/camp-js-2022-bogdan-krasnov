/**
 * User dto.
 */
export interface UserDto {

  /** Unique identifier. */
  readonly id: number;

  /** Email. */
  readonly email: string;

  /** First name. */
  readonly first_name: string;

  /** Last name. */
  readonly last_name: string;

  /** Password. */
  readonly password: string;

}
