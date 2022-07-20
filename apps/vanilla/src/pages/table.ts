import { isInputElement } from '@js-camp/core/utils/guards/element.guard';

import { updateAnimeList } from '../scripts/table';
import { checkNull } from '../core/utils/checkNull';
import { PAGE_SIZE_DEFAULT, CURRENT_PAGE_DEFAULT, FIRST_PAGE, ORDERING_DEFAULT, DEFAULT_SEARCH_QUERY, PREV_PAGE } from '../core/constants/anime';
import { createPaginationButton, createDynamicPaginationButtons } from '../scripts/pagination';

import { DATA_ATTRIBUTE_BUTTON_NAME, NEXT_PAGE } from './../core/constants/anime';

import { Ordering } from './../core/enums/table';

const INPUT_CLASS = 'input-search';

/** Table anime class. */
export class Table {

  /** Current Page. */
  private currentPage = CURRENT_PAGE_DEFAULT;

  /** Page Quantity. */
  private readonly quantityPage: number;

  /** Current sorting. */
  private currentSorting = ORDERING_DEFAULT;

  /** Quantity anime. */
  private readonly quantityAnime: number;

  /** Search query. */
  private search = DEFAULT_SEARCH_QUERY;

  public constructor(quantityAnime: number) {
    this.quantityAnime = quantityAnime;
    this.quantityPage = Math.ceil(this.quantityAnime / PAGE_SIZE_DEFAULT);

    updateAnimeList(this.currentPage, this.currentSorting, this.search);

    this.setPagination();
    this.sortAnimeList();
    this.initAnimeSearch();
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

    updateAnimeList(this.currentPage, this.currentSorting, this.search);

    this.setPagination();
  }

  /** Sort function anime. */
  private sortAnimeList(): void {
    const sort = document.querySelector<HTMLSelectElement>('.sort-anime-table');
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
      updateAnimeList(this.currentPage, this.currentSorting, this.search);
    });
  }

  /**
   * Changes search string.
   * @param event Some event.
   */
  private handleChangeSearch(event: Event): void {
    event.preventDefault();

    if (event.currentTarget !== null && isInputElement(event.currentTarget)) {
      this.search = event.currentTarget.value;
    }

    updateAnimeList(this.currentPage, this.currentSorting, this.search);
  }

  /** Search string initialization. */
  private initAnimeSearch(): void {
    const inputElement = document.querySelector<HTMLInputElement>(`.${INPUT_CLASS}`);

    if (inputElement === null) {
      return;
    }

    inputElement.addEventListener('change', event => {
      this.handleChangeSearch(event);

      this.setPagination();
    });
  }
}
