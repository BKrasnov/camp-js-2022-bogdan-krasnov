import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Anime } from '@js-camp/core/models/anime';
import { Observable, map } from 'rxjs';

import { AnimeDetails } from './../models/animeDetails';

import { AppConfigService } from './app-config.service';
import { AnimeDetailsDto } from './mappers/dto/animeDetails.dto';
import { AnimeDetailMapper } from './mappers/animeDetails.mapper';

const DEFAULT_PAGINATION_PARAMS = {
  page: 0,
};

/** Anime service. */
@Injectable({
  providedIn: 'root',
})
export class AnimeService {

  private readonly animeListUrl: URL;

  public constructor(appConfig: AppConfigService, private readonly http: HttpClient) {
    this.animeListUrl = new URL('anime/anime/', appConfig.apiUrl);
  }

  /** Get a list of anime. */
  public getAnimeList(): Observable<Anime[]> {
    return this.http.get<PaginationDto<AnimeDto>>(this.animeListUrl.toString(), {
      params: new HttpParams()
        .set('limit', DEFAULT_PAGINATION_PARAMS.page)
        .set('ordering', 'id'),
    }).pipe(
      map(animeDto => animeDto.results.map(anime => AnimeMapper.fromDto(anime))),
    );
  }

  /** Get anime by id.
   * @param id Anime id.
   */
  public getAnimeDetailsById(id: number): Observable<AnimeDetails> {
    const animeUrl = new URL(`${id}/`, this.animeListUrl);
    return this.http.get<AnimeDetailsDto>(animeUrl.toString()).pipe(
      map(animeDetailsDto => AnimeDetailMapper.fromDto(animeDetailsDto)),
    );
  }
}
