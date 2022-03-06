import { Component, HostListener, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { FilmSearchList } from '../app-interfaces';
import { FilmApiService } from '../film-api.service';

@Component({
  selector: 'app-film-content',
  templateUrl: './film-content.component.html',
  styleUrls: ['./film-content.component.scss'],
})
export class FilmContentComponent implements OnDestroy {
  @HostListener('window:resize')
  onResize() {
    this.screenSize = window.innerWidth;
  }

  readonly searchList$: Observable<FilmSearchList>;
  readonly destroy$ = new Subject<boolean>();
  screenSize = window.innerWidth;

  constructor(
    private filmService: FilmApiService,
    private activatedRoute: ActivatedRoute
  ) {
    this.searchList$ = this.filmService.items$;
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        const { page, s } = params;
        this.filmService.fetchSearchItems({ page, s });
      });
  }

  nextPage() {
    this.filmService.fetchNextPage();
  }

  previousPage() {
    this.filmService.fetchPreviousPage();
  }

  displayCardTitle(cardIndex: number) {
    // Since responsive designs are not in the design figma,
    // I will always display all title titles on smaller resolutions.
    // But this logic can be adjusted easily to suit varying criteria.
    // Simplest way for now is to detect screen size via hostlistner
    // and manipulate card iteration via this method.
    if (this.screenSize < 1200) return true;
    // Should only diplay title for first row of cards
    return cardIndex < 4;
  }

  ngOnDestroy() {
    // Best practice to destroy all Observable subscriptions.
    // Avoids memory leaks.
    this.destroy$.next(true);
  }
}
