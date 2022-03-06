import { TestBed } from '@angular/core/testing';
import { AppConfigService } from './app-config.service';
import { Mock } from 'ts-mocks';

import { FilmApiService } from './film-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('FilmApiService', () => {
  let service: FilmApiService;

  const mockBaseUrl = 'https://some-path';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: AppConfigService,
          useFactory: () =>
            new Mock<AppConfigService>({
              apiBaseUrl: mockBaseUrl,
            }).Object,
        },
      ],
    });

    service = TestBed.inject(FilmApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // TODO add more tests
});
