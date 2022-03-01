import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilmContentComponent } from './film-content/film-content.component';
import { FilmCardComponent } from './film-card/film-card.component';

@NgModule({
  declarations: [AppComponent, FilmContentComponent, FilmCardComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
