import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Mock } from 'ts-mocks';
import {
  getElementByCss,
  getElementsByCss,
  getTextContent,
  mockModalDetail,
} from '../util/test-util';

import { FilmModalComponent } from './film-modal.component';

describe('FilmModalComponent', () => {
  let component: FilmModalComponent;
  let fixture: ComponentFixture<FilmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilmModalComponent],
      providers: [
        {
          provide: NgbActiveModal,
          useFactory: () => new Mock<NgbActiveModal>({}).Object,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmModalComponent);
    component = fixture.componentInstance;
    component.item = mockModalDetail();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display image of the movie', () => {
    expect(getElementByCss(fixture, 'img')).toBeTruthy();
  });

  it('should display the expected heading with year', () => {
    const element = getElementByCss(fixture, 'h1');
    expect(getTextContent(element)).toEqual('Title One (2000)');
  });

  it('should display the body of the modal as expected', () => {
    const elements = getElementsByCss(fixture, 'p');
    // Assert director name
    expect(getTextContent(elements[0])).toEqual('Director: Tony');
    // Assert cast names
    expect(getTextContent(elements[1])).toEqual('Cast: Al, pal, cal');
    // Assert genre
    expect(getTextContent(elements[2])).toEqual('Genre: Action');
    // Assert plot text
    expect(getTextContent(elements[3])).toEqual('Some plot for the movie');
  });
});
