import { Immerable, OmitImmerable } from './immerable';

/** Pagination. */
export class Pagination<T> extends Immerable {
  /** Total count of items. */
  public readonly count: number;

  /** Next page of items. */
  public readonly next: string;

  /** Previous page of items. */
  public readonly previous: string;

  /** Array of items requested. */
  public readonly results: readonly T[];

  public constructor(data: InitArgsPagination<T>) {
    super();
    this.count = data.count;
    this.next = data.next;
    this.previous = data.previous;
    this.results = data.results;
  }
}

type InitArgsPagination<T> = OmitImmerable<Pagination<T>>;
