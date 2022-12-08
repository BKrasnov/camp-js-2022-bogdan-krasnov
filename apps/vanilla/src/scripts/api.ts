import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';

import { CURRENT_PAGE_DEFAULT, PAGE_SIZE_DEFAULT } from '../core/constants/anime';

import { Ordering } from '../core/enums/table';

import { apiAnime } from '../core/utils/axiosInstance';

/**
 * Pagination parameters.
 * @param currentPage Current page.
 * @param limit Size page.
 */
interface PaginationConfig {

  /** The number of results returned per page. */
  readonly currentPage: number;

  /** Limit page. */
  readonly limit?: number;
}

/**
 * Parameters for getting data from the database.
 * @param ordering Current ordering for the page.
 * @param pagination Pagination parameters.
 */
export interface AnimeSearchParams {

  /** Ordering page. */
  readonly ordering?: Ordering;

  /** Pagination page. */
  readonly pagination: PaginationConfig;
}

/**
 * Reception with a configured URL.
 * @param animeSearchParams Parameters for getting anime from the database.
 */
export async function getAnimeData(animeSearchParams: AnimeSearchParams): Promise<Pagination<Anime>> {
  const configDefault = {
    currentPageDefault: CURRENT_PAGE_DEFAULT,
    orderingDefault: Ordering.None,
    limitDefault: PAGE_SIZE_DEFAULT,
  };
  const { currentPageDefault, orderingDefault, limitDefault } = configDefault;

  const { currentPage = currentPageDefault, limit = limitDefault } = animeSearchParams.pagination;
  const { ordering = orderingDefault } = animeSearchParams;

  const offset = (currentPage - 1) * limit;

  const queryParams = new URLSearchParams([]);
  queryParams.append('limit', String(limit));
  queryParams.append('offset', String(offset));
  queryParams.append('ordering', `${ordering},id`);

  const urlAnime = queryParams.toString();
  const response = await apiAnime.get<PaginationDto<AnimeDto>>(
    `/anime/anime/?${urlAnime}`,
  );
  return PaginationMapper.fromDto(
    response.data,
    animeDto => AnimeMapper.fromDto(animeDto),
  );
}
