import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * The page that was not found.
 */
@Component({
  selector: 'camp-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class NotFoundComponent {
}
