import { Component, Input, OnInit } from '@angular/core';
import { FilmSearchListItem } from '../app-interfaces';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss'],
})
export class FilmCardComponent implements OnInit {
  @Input() item: FilmSearchListItem;
  @Input() displayTitle?: boolean;

  constructor() {}

  ngOnInit(): void {
    console.log(JSON.stringify(this.item));
  }
}
