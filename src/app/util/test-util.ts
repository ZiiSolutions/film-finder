import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FilmDetail, FilmSearchListItem } from '../app-interfaces';

/*
 *Helper functions for common unit testing operations.
 */

export const getElementByCss = (fixture: ComponentFixture<any>, css: string) =>
  getElementByCssDebugElement(fixture.debugElement, css);

export const getElementsByCss = (fixture: ComponentFixture<any>, css: string) =>
  getElementsByCssDebugElement(fixture.debugElement, css);

export const getElementByCssDebugElement = (
  debugElement: DebugElement,
  css: string
) => debugElement.query(By.css(css));

export const getElementsByCssDebugElement = (
  debugElement: DebugElement,
  css: string
) => debugElement.queryAll(By.css(css));

export const getTextContent = (debugElement: DebugElement) =>
  debugElement.nativeElement.textContent!.trim();

// Placing mock items used in testing here. Makes the test files less convoluted.
// And allows you to reuse across components.
export const mockItem = (): FilmSearchListItem => {
  return {
    Title: 'Title One',
    Year: '2000',
    imdbID: '1n234b',
    Type: 'foo',
    Poster: 'http://foo.png',
  };
};

export const mockItems = (): FilmSearchListItem[] => {
  return [
    {
      Title: 'Title One',
      Year: '2000',
      imdbID: '1n234b',
      Type: 'foo',
      Poster: 'http://foo.png',
    },
    {
      Title: 'Title Two',
      Year: '2000',
      imdbID: '1neeee',
      Type: 'foo',
      Poster: 'http://foo-two.png',
    },
    {
      Title: 'Title Three',
      Year: '2000',
      imdbID: '1neeoo',
      Type: 'foo',
      Poster: 'http://foo-three.png',
    },
  ];
};

export const mockModalDetail = (): FilmDetail => {
  return {
    Title: 'Title One',
    Year: '2000',
    Genre: 'Action',
    Director: 'Tony',
    Actors: 'Al, pal, cal',
    Plot: 'Some plot for the movie',
    Poster: 'http://foo.png',
  };
};
