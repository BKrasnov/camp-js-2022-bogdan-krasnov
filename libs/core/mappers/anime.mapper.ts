import { AnimeStatus, AnimeType } from '../utils/enums/table';

import { AnimeDto } from '../dtos/anime.dto';
import { Anime } from '../models/anime';
import { checkAnimeProperty } from '../utils/scripts/anime';

export namespace AnimeMapper {

  /**
   * Maps dto to model.
   * @param dto Anime dto.
   */
  export function fromDto(dto: AnimeDto): Anime {
    checkAnimeProperty(dto.type, dto.status);
    return new Anime({
      id: dto.id,
      imageSrc: dto.image,
      titleEnglish: dto.title_eng,
      titleJapanese: dto.title_jpn,
      status: dto.status as AnimeStatus,
      type: dto.type as AnimeType,
      airedStart: dto.aired.start === null ? null : new Date(dto.aired.start),
      airedEnd: dto.aired.end === null ? null : new Date(dto.aired.end),
    });
  }
}
