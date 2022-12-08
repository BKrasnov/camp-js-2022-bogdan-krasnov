import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../../material/material.module';

import { AnimeRoutingModule } from './anime.routing';

import { AnimeTableComponent } from './components/anime-table/anime-table.component';
import { AnimeComponent } from './anime.component';
import { DetailsComponent } from './details/details.component';

/** Anime module. */
@NgModule({
  declarations: [AnimeComponent, AnimeTableComponent, DetailsComponent],
  imports: [CommonModule, AnimeRoutingModule, MaterialModule],
})
export class AnimeModule {}
