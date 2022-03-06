import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilmContentComponent } from './film-content/film-content.component';
import { FilmCardComponent } from './film-card/film-card.component';
import { FilmHeaderComponent } from './film-header/film-header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilmModalComponent } from './film-modal/film-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    FilmContentComponent,
    FilmCardComponent,
    FilmHeaderComponent,
    FilmModalComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
