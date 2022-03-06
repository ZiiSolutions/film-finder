import { Component, Input } from '@angular/core';
import { FilmSearchListItem } from '../app-interfaces';
import { FilmModalComponent } from '../film-modal/film-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FilmApiService } from '../film-api.service';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss'],
})
export class FilmCardComponent {
  @Input() item: FilmSearchListItem;
  @Input() displayTitle?: boolean;

  constructor(
    private filmService: FilmApiService,
    private modalService: NgbModal
  ) {}

  openModal() {
    this.filmService.fetchItem({ i: this.item.imdbID }).subscribe((item) => {
      const modalRef = this.modalService.open(FilmModalComponent, {
        size: 'xl',
        centered: true,
        // scrollable: true,
      });
      modalRef.componentInstance.item = item;
    });
  }
}
