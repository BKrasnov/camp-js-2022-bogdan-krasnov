import { AnimeType } from '@js-camp/core/utils/enums/table';

import { countAnime, updateAnimeList } from '../scripts/table';

import { PAGE_SIZE_DEFAULT, CURRENT_PAGE_DEFAULT, FIRST_PAGE, ORDERING_DEFAULT, PREV_PAGE } from '../core/constants/anime';
import { checkNull } from '../core/utils/checkNull';

import { createPaginationButton, createDynamicPaginationButtons } from '../scripts/pagination';

import { DATA_ATTRIBUTE_BUTTON_NAME, NEXT_PAGE } from './../core/constants/anime';

import { Ordering } from './../core/enums/table';

/** Table anime class. */
export class Table {

  /** Current Page. */
  private currentPage: number;

  /** Page Quantity. */
  private quantityPage: number;

  /** Current sorting. */
  private currentSorting: Ordering;

  /** Quantity anime. */
  private quantityAnime: number;

  /** Current anime. */
  private currentFiltering: AnimeType;

  public constructor(quantityAnime: number) {
    this.quantityAnime = quantityAnime;
    this.currentPage = CURRENT_PAGE_DEFAULT;
    this.quantityPage = Math.ceil(this.quantityAnime / PAGE_SIZE_DEFAULT);
    this.currentFiltering = AnimeType.None;
    this.currentPage = CURRENT_PAGE_DEFAULT;
    this.currentSorting = ORDERING_DEFAULT;
    updateAnimeList(this.currentPage, this.currentSorting, this.currentFiltering);
    this.filterAnimeList();
    this.sortAnimeList();
    this.setPagination();
  }

  /** Creates pagination buttons for anime table. */
  private setPagination(): void {
    const paginationButtons = document.querySelector<HTMLDivElement>('.pagination');
    const pageNumber = document.querySelector<HTMLDivElement>('.page-number');
    checkNull(paginationButtons);
    checkNull(pageNumber);
    pageNumber.innerHTML = `Page ${this.currentPage}`;
    paginationButtons.innerHTML = ``;

    const prevButton = createPaginationButton(PREV_PAGE);
    prevButton.addEventListener('click', () => {
      this.updatePagination(prevButton);
    });
    const nextButton = createPaginationButton(NEXT_PAGE);
    nextButton.addEventListener('click', () => {
      this.updatePagination(nextButton);
    });
    if (this.currentPage === FIRST_PAGE) {
      prevButton.disabled = true;
    }
    if (this.currentPage === this.quantityPage) {
      nextButton.disabled = true;
    }

    paginationButtons.append(prevButton);
    createDynamicPaginationButtons(this.currentPage, this.quantityPage).forEach(page => {
      if (page !== '...') {
        const buttonDynamic = createPaginationButton(String(page));
        buttonDynamic.addEventListener('click', () => {
          this.updatePagination(buttonDynamic);
        });
        if (page === this.currentPage) {
          buttonDynamic.classList.add('active');
        }
        paginationButtons.append(buttonDynamic);
      } else {
        const buttonPoints = createPaginationButton(page, true);
        paginationButtons.append(buttonPoints);
      }
    });
    paginationButtons.append(nextButton);
  }

  /**
   * Updates pagination and anime list with new values.
   * @param pageButton Button in pagination.
   */
  private updatePagination(pageButton: HTMLButtonElement): void {
    const pageValue = pageButton.getAttribute(DATA_ATTRIBUTE_BUTTON_NAME);
    if (pageValue === NEXT_PAGE && this.currentPage < this.quantityPage) {
      this.currentPage++;
    }
    if (pageValue === PREV_PAGE && this.currentPage > FIRST_PAGE) {
      this.currentPage--;
    }
    if (!isNaN(Number(pageValue))) {
      this.currentPage = Number(pageValue);
    }
    updateAnimeList(this.currentPage, this.currentSorting, this.currentFiltering);
    this.setPagination();
  }

  /** Sort function anime. */
  private sortAnimeList(): void {
    const sort = document.querySelector<HTMLSelectElement>('.sort__anime-table');
    checkNull(sort);
    for (const type in Ordering) {
      const option = document.createElement('option');
      option.innerText = type;
      option.value = type;
      sort.appendChild(option);
    }
    sort.addEventListener('change', (event: Event) => {
      const target = event.target as HTMLSelectElement;
      const animeOrder = target.value;
      for (const order in Ordering) {
        if (animeOrder === order) {
          this.currentSorting = Ordering[order];
        }
    }
    updateAnimeList(this.currentPage, this.currentSorting, this.currentFiltering);
  });
  }

  /** Filter anime list. */
  private filterAnimeList(): void {
    const filter = document.querySelector<HTMLSelectElement>('.filter__anime-table');
    if (filter === null) {
      throw new Error('no filter');
    }
    for (const type in AnimeType) {
      const option = document.createElement('option');
      option.innerText = type;
      option.value = type;
      filter.appendChild(option);
    }
    filter.addEventListener('change', async(event: Event) => {
      const target = event.target as HTMLSelectElement;
      const animeType = target.value;
      for (const type in AnimeType) {
        if (animeType === type) {
          this.currentFiltering = AnimeType[type];
        }
      }
      this.quantityAnime = await countAnime(this.currentPage, this.currentSorting, this.currentFiltering);
      this.quantityPage = Math.ceil(this.quantityAnime / PAGE_SIZE_DEFAULT);
      this.currentPage = FIRST_PAGE;
      updateAnimeList(this.currentPage, this.currentSorting, this.currentFiltering);
      this.setPagination();
    });
  }
}
