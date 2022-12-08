import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';

/** Shared module. */
@NgModule({
  declarations: [NotFoundComponent],
  imports: [CommonModule],
})
export class SharedModule {}
