import { DATA_ATTRIBUTE_BUTTON_NAME } from '../core/constants/anime';

/**
 * Create button in pagination.
 * @param dataText Text for innerText.
 * @param isDisabled Disabled button.
 */
export function createPaginationButton(dataText: string, isDisabled = false): HTMLButtonElement {
  const buttonPaginator = document.createElement('button');
  buttonPaginator.className = 'pagination__button';
  buttonPaginator.setAttribute(DATA_ATTRIBUTE_BUTTON_NAME, dataText);
  buttonPaginator.innerText = dataText;
  buttonPaginator.disabled = isDisabled;
  return buttonPaginator;
}

/**
 * Create dynamic buttons in pagination.
 * @param currentPage Current page.
 * @param quantityPage Number of pages.
 * @returns An array with strings or numbers that denote pagination buttons.
 */
export function createDynamicPaginationButtons(currentPage: number, quantityPage: number): Array<string | number> {
  const lastPage = quantityPage;
  const leftButton = currentPage - 1;
  const rightButton = currentPage + 1;
  const countedDynamicButtons: Array<number> = [];
  const countedDynamicButtonsWithPoints: Array<number | string> = [];
  for (let i = 1; i <= lastPage; i++) {
    if (i === 1 || i === lastPage || (i >= leftButton && i <= rightButton)) {
      countedDynamicButtons.push(i);
    }
  }

  let rangeBetweenPointsAndNumbers = 0;
  for (const i of countedDynamicButtons) {
    if (i - rangeBetweenPointsAndNumbers !== 1) {
      countedDynamicButtonsWithPoints.push('...');
    }
    countedDynamicButtonsWithPoints.push(i);
    rangeBetweenPointsAndNumbers = i;
  }
  return countedDynamicButtonsWithPoints;
}
