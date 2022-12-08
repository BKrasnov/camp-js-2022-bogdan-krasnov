/**
 * The function checks the element for null and undefined.
 * @param value Check the value.
 */
export function checkNull<T>(value: T | undefined | null): asserts value is NonNullable<T> {
  if (value == null) {
    throw new Error('Value can not be null or undefined');
  }
}
