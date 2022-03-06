import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmCardComponent } from './film-card.component';
import { FilmApiService } from '../film-api.service';
import { Mock } from 'ts-mocks';
import { getElementByCss, getTextContent, mockItem } from '../util/test-util';

describe('FilmCardComponent', () => {
  let component: FilmCardComponent;
  let fixture: ComponentFixture<FilmCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilmCardComponent],
      providers: [
        {
          provide: FilmApiService,
          useFactory: () => new Mock<FilmApiService>({}).Object,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmCardComponent);
    component = fixture.componentInstance;
    component.item = mockItem();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display image with correct alt text', () => {
    const img = getElementByCss(fixture, 'img');
    expect(img).toBeTruthy();
  });

  it('should NOT display title and year', () => {
    const element = getElementByCss(fixture, 'figcaption');
    expect(element).toBeFalsy();
  });

  it('should display title and year', () => {
    component.displayTitle = true;
    fixture.detectChanges();
    const element = getElementByCss(fixture, 'figcaption');
    expect(getTextContent(element)).toEqual('Title One 2000');
  });
});
