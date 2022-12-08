/** Basic representation of a user. */
export interface User {

  /** User id. */
  readonly id?: number;

  /** User email. */
  readonly email: string;

  /** User firstName. */
  readonly firstName: string;

  /** User lastName. */
  readonly lastName: string;

  /** User password. */
  readonly password: string;
}
