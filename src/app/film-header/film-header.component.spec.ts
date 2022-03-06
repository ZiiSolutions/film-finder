import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilmApiService } from '../film-api.service';
import { Mock } from 'ts-mocks';

import { FilmHeaderComponent } from './film-header.component';
import { getElementByCss } from '../util/test-util';

describe('FilmHeaderComponent', () => {
  let component: FilmHeaderComponent;
  let fixture: ComponentFixture<FilmHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilmHeaderComponent],
      providers: [
        {
          provide: FilmApiService,
          useFactory: () => new Mock<FilmApiService>({}).Object,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display logo', () => {
    expect(getElementByCss(fixture, 'img')).toBeTruthy();
  });

  it('should display search box', () => {
    expect(getElementByCss(fixture, 'input')).toBeTruthy();
  });

  it('should display submit button', () => {
    expect(getElementByCss(fixture, 'button')).toBeTruthy();
  });
});
