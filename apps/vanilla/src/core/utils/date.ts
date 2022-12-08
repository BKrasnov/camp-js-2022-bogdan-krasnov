/**
 * Converting date to string format DD-MM-YYYY.
 * @param date Date.
 */
export function formatDate(date: Date | null): null | string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  if (date === null) {
    return null;
  }
  return date.toLocaleString('ru', options);
}
