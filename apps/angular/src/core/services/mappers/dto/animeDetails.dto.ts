import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { GenreDto } from '@js-camp/core/dtos/genre.dto';

import { StudioDto } from './studio.dto';

/** Anime details dto. */
export interface AnimeDetailsDto extends AnimeDto {

  /** List of anime genres. */
  readonly genres_data: readonly GenreDto[];

  /** List of anime producing studios. */
  readonly studios_data: readonly StudioDto[];

  /** Whether it is airing. */
  readonly airing: boolean;

  /** Anime trailer ID. */
  readonly trailer_youtube_id: string;

  /** Short review about anime. */
  readonly synopsis: string;
}
