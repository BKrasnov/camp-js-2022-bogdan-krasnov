import { Immerable, OmitImmerable } from '@js-camp/core/models/immerable';

/** Studio. */
export class Studio extends Immerable {

  /** Id. */
  public readonly id: number;

  /** Name. */
  public readonly name: string;

  public constructor(data: InitArgsStudio) {
    super();
    this.id = data.id;
    this.name = data.name;
  }
}

type InitArgsStudio = OmitImmerable<Studio>;
