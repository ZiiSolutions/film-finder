import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmContentComponent } from './film-content/film-content.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: FilmContentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
