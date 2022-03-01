import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FilmSearchList } from '../app-interfaces';
import { FilmApiService } from '../film-api.service';

@Component({
  selector: 'app-film-content',
  templateUrl: './film-content.component.html',
  styleUrls: ['./film-content.component.scss'],
})
export class FilmContentComponent implements OnInit {
  @HostListener('window:resize')
  onResize() {
    this.screenSize = window.innerWidth;
  }

  readonly searchList$: Observable<FilmSearchList>;
  screenSize = window.innerWidth;

  constructor(private filmService: FilmApiService) {
    this.searchList$ = this.filmService.items$;
    this.filmService.fetchInitialPage();
  }

  displayCardTitle(cardIndex: number) {
    // Since responsive designs are not in the design figma,
    // I will always display all title titles on smaller resolutions.
    // But this logic can be adjusted easily to suit varying criteria.
    if (this.screenSize < 1200) return true;
    // Should only diplay title for first row of cards
    return cardIndex < 4;
  }

  ngOnInit(): void {}
}
