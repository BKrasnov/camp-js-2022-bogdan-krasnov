import { AnimeStatus, AnimeType } from '../utils/enums/table';

import { Immerable, OmitImmerable } from './immerable';

/** Anime. */
export class Anime extends Immerable {

  /** Id anime. */
  public readonly id: number;

  /** Anime picture. */
  public readonly imageSrc: string;

  /** Anime title in english. */
  public readonly titleEnglish: string;

  /** The name of the anime in Japanese. */
  public readonly titleJapanese: string;

  /** Anime type. */
  public readonly type: AnimeType;

  /** Anime status. */
  public readonly status: AnimeStatus;

  /** Aired start. */
  public readonly airedStart: Date | null;

  /** Aired start. */
  public readonly airedEnd: Date | null;

  public constructor(data: InitArgsAnime) {
    super();
    this.id = data.id;
    this.imageSrc = data.imageSrc;
    this.titleEnglish = data.titleEnglish;
    this.titleJapanese = data.titleJapanese;
    this.type = data.type;
    this.status = data.status;
    this.airedStart = data.airedStart;
    this.airedEnd = data.airedEnd;
  }
}

type InitArgsAnime = OmitImmerable<Anime>;
