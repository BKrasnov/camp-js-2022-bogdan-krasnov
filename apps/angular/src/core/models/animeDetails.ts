import { Anime } from '@js-camp/core/models/anime';
import { Genre } from '@js-camp/core/models/genre';
import { OmitImmerable } from '@js-camp/core/models/immerable';

import { Studio } from './studio';

/** Anime details. */
export class AnimeDetails extends Anime {

  /** Short review about anime. */
  public readonly synopsis: string;

  /** Whether it is airing. */
  public readonly isAiring: boolean;

  /** List of anime genres. */
  public readonly genresList: readonly Genre[];

  /** List of anime producing studios. */
  public readonly studiosList: readonly Studio[];

  /** Anime trailer ID. */
  public readonly trailerYoutubeId: string | null;

  public constructor(data: InitArgsAnimeDetails) {
    super(data);
    this.genresList = data.genresList;
    this.studiosList = data.studiosList;
    this.isAiring = data.isAiring;
    this.trailerYoutubeId = data.trailerYoutubeId;
    this.synopsis = data.synopsis;
  }
}

type InitArgsAnimeDetails = OmitImmerable<AnimeDetails>;
