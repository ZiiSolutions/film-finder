export type Video = 'movie' | 'series' | 'episode';
export type Plot = 'short' | 'full';

export interface ApiSearchQueryParams {
  s: string;
  type?: Video;
  page?: number;
}

export interface ApiItemQueryParams {
  i: string;
  plot: Plot;
}

export interface FilmSearchList {
  Search: FilmSearchListItem[];
  totalResults: number;
}

export interface FilmSearchListItem {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}
