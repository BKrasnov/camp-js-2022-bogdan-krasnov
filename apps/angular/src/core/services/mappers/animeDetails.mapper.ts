import { GenreMapper } from '@js-camp/core/mappers/genre.mapper';
import { AnimeStatus, AnimeType } from '@js-camp/core/utils/enums/table';
import { checkAnimeProperty } from '@js-camp/core/utils/scripts/anime';

import { AnimeDetails } from '../../models/animeDetails';

import { AnimeDetailsDto } from './dto/animeDetails.dto';
import { StudioMapper } from './studio.mapper';

export namespace AnimeDetailMapper {

  /**
   * Maps dto to anime model.
   * @param dto Anime details dto.
   */
  export function fromDto(dto: AnimeDetailsDto): AnimeDetails {
    checkAnimeProperty(dto.type, dto.status);
    return new AnimeDetails({
      isAiring: dto.airing,
      id: dto.id,
      imageSrc: dto.image,
      titleEnglish: dto.title_eng,
      titleJapanese: dto.title_jpn,
      airedStart: dto.aired.start === null ? null : new Date(dto.aired.start),
      airedEnd: dto.aired.end === null ? null : new Date(dto.aired.end),
      status: dto.status as AnimeStatus,
      type: dto.type as AnimeType,
      synopsis: dto.synopsis,
      studiosList: dto.studios_data.map(studio => StudioMapper.fromDto(studio)),
      genresList: dto.genres_data.map(genre => GenreMapper.fromDto(genre)),
      trailerYoutubeId: dto.trailer_youtube_id,
    });
  }
}
