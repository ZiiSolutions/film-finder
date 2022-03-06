import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FilmApiService } from '../film-api.service';

@Component({
  selector: 'app-film-header',
  templateUrl: './film-header.component.html',
  styleUrls: ['./film-header.component.scss'],
})
export class FilmHeaderComponent {
  readonly form = new FormGroup({
    search: new FormControl(),
  });

  constructor(private filmService: FilmApiService) {}

  onSubmit() {
    const { search } = this.form.value;
    this.filmService.adjustRoute({ page: 1, s: search });
  }
}
