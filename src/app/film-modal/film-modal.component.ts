import { Component, Input } from '@angular/core';
import { FilmDetail } from '../app-interfaces';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-film-modal',
  templateUrl: './film-modal.component.html',
  styleUrls: ['./film-modal.component.scss'],
})
export class FilmModalComponent {
  @Input() item: FilmDetail;

  constructor(private modalService: NgbActiveModal) {}

  closeModel() {
    this.modalService.close();
  }
}
