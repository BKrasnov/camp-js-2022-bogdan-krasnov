import { AnimeDto } from './../../../../../libs/core/dtos/anime.dto';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';

import { CURRENT_PAGE_DEFAULT, Ordering, PAGE_SIZE_DEFAULT } from '../constants/anime';

import { apiAnime } from './axiosInstance';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';

/** Parameters for getting anime from the database.
 * @param currentPage Current page.
 * @param ordering Ordering page.
 * @param limit Size page.
 */
export interface PaginationConfig {

  /** The number of results returned per page. */
  currentPage: number;

  /** Current page. */
  ordering: Ordering;

  /** Sorting mode. */
  readonly limit?: number;
}

/**
 * Reception function with a configured URL.
 * @param paginationConfig Parameters for getting anime from the database.
 */
export async function getAnimeData(paginationConfig: PaginationConfig): Promise<Pagination<Anime>> {
  const { currentPage = CURRENT_PAGE_DEFAULT, ordering = Ordering.None, limit = PAGE_SIZE_DEFAULT } = paginationConfig;
  const offset = (currentPage - 1) * limit;
  const urlAnime = new URLSearchParams(`limit=${limit}&offset=${offset}&ordering=${ordering.concat(',')}id`);
  const response = await apiAnime.get(
    `/anime/anime/?${urlAnime}`,
  );
  return PaginationMapper.fromDto<AnimeDto, Anime>(
    response.data,
    animeDto => AnimeMapper.fromDto(animeDto),
  );
}
