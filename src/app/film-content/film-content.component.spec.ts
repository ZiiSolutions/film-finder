import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilmApiService } from '../film-api.service';
import { Mock } from 'ts-mocks';

import { FilmContentComponent } from './film-content.component';
import { of } from 'rxjs';
import {
  getElementByCss,
  getElementsByCss,
  getTextContent,
  mockItems,
} from '../util/test-util';
import { RouterTestingModule } from '@angular/router/testing';
import { FilmCardComponent } from '../film-card/film-card.component';

describe('FilmContentComponent', () => {
  let component: FilmContentComponent;
  let fixture: ComponentFixture<FilmContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilmContentComponent, FilmCardComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: FilmApiService,
          useFactory: () =>
            new Mock<FilmApiService>({
              items$: of({
                Search: mockItems(),
                totalResults: 1000,
                totalPages: 200,
                page: 1,
              }),
            }).Object,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display total results found for the search', () => {
    const element = getElementByCss(fixture, '.total-results');
    expect(getTextContent(element)).toEqual('1000 Results found');
  });

  it('should display page number in the correct format', () => {
    const element = getElementByCss(fixture, '.search-pagination-container');
    expect(getTextContent(element)).toEqual('Page 1 of 200');
  });

  it('should forward arrow to allow pagination', () => {
    expect(getElementByCss(fixture, '.forward-arrow')).toBeTruthy();
  });

  it('should back arrow to allow pagination ', () => {
    expect(getElementByCss(fixture, '.back-arrow')).toBeTruthy();
  });

  it('should display 3 card components', () => {
    expect(getElementsByCss(fixture, 'app-film-card').length).toEqual(3);
  });
});
