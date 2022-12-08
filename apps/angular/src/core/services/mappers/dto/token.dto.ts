/** User token dto. */
export interface TokenDto {

  /** Access token. */
  readonly access: string;

  /** Refresh token. */
  readonly refresh: string;
}
