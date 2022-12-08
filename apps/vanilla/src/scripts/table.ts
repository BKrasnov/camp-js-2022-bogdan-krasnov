import { Anime } from '@js-camp/core/models/anime';

import { getAnimeData, AnimeSearchParams } from '../scripts/api';
import { checkNull } from '../core/utils/checkNull';
import { formatDate } from '../core/utils/date';

import { PAGE_SIZE_DEFAULT } from './../core/constants/anime';

import { Ordering } from './../core/enums/table';

/**
 * Refresh current page.
 * @param currentPage Current Page.
 * @param ordering Current ordering.
 */
export async function updateAnimeList(currentPage: number, ordering: Ordering): Promise<void> {
  const paginationConfig: AnimeSearchParams = { ordering, pagination: { currentPage } };
  const tbody = document.querySelector<HTMLTableElement>('.table-anime__body');
  checkNull(tbody);
  tbody.innerHTML = '';
  const animeData = await getAnimeData(paginationConfig);
  animeData.results.forEach(anime => {
    if (tbody.childElementCount < PAGE_SIZE_DEFAULT) {
      renderAnime(anime);
    }
  });
}

/**
 * Render single anime.
 * @param anime Anime object.
 */
function renderAnime(anime: Anime): void {
  const { titleEnglish, titleJapanese, status, imageSrc, type, airedStart } = anime;
  const tableBody = document.querySelector<HTMLTableElement>('.table-anime__body');
  checkNull(tableBody);
  tableBody.innerHTML += `
  <tr>
    <td><img src="${imageSrc}" class="image-anime"></td>
    <td class="table-anime__cell">${titleEnglish === '' ? 'NO NAME' : titleEnglish}</td>
    <td class="table-anime__cell">${titleJapanese === '' ? 'NO NAME' : titleJapanese}</td>
    <td class="table-anime__cell">${status}</td>
    <td class="table-anime__cell">${type}</td>
    <td class="table-anime__cell">${airedStart == null ? 'NO AIRED START' : formatDate(airedStart)}</td>
  </tr>
  `;
}
