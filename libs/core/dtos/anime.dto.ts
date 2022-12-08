/** Interface for the anime. */
export interface AnimeDto {

  /** Anime id. */
  readonly id: number;

  /** Anime picture. */
  readonly image: string;

  /** Anime title in english. */
  readonly title_eng: string;

  /** The name of the anime in Japanese. */
  readonly title_jpn: string;

  /** Anime type. */
  readonly type: string;

  /** Anime status. */
  readonly status: string;

  /** Anime aired. */
  readonly aired: AiredDto;
}

/** Interface for the aired. */
interface AiredDto {

  /** Aired start. */
  readonly start: string;

  /** Aired end. */
  readonly end: string;
}
