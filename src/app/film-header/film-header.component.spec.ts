import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmHeaderComponent } from './film-header.component';

describe('FilmHeaderComponent', () => {
  let component: FilmHeaderComponent;
  let fixture: ComponentFixture<FilmHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilmHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
