import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { map, Observable, switchMap } from 'rxjs';

import { AnimeDetails } from './../../../../core/models/animeDetails';

import { AnimeService } from './../../../../core/services/anime.service';

/** Details component. */
@Component({
  selector: 'camp-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent {

  /** Anime id. */
  private readonly animeId$: Observable<number> = this.activatedRoute.params.pipe(
    map((params: Params) => parseInt(params['id'], 10)),
  );

  /** Anime. */
  public readonly anime$: Observable<AnimeDetails>;

  public constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly animeService: AnimeService,
  ) {
    this.anime$ = this.animeId$.pipe(
      switchMap(id => animeService.getAnimeDetailsById(id)),
    );
  }

}
