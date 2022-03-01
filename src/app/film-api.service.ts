import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { AppConfigService } from './app-config.service';
import { ApiSearchQueryParams, FilmSearchList } from './app-interfaces';

@Injectable({
  providedIn: 'root',
})
export class FilmApiService {
  private _items = new ReplaySubject<FilmSearchList>(1);

  constructor(
    private appConfig: AppConfigService,
    private httpClient: HttpClient
  ) {}

  fetchSearchItems(searchParams: ApiSearchQueryParams) {
    const params = new URLSearchParams({
      apikey: this.appConfig.apiKey,
      s: searchParams.s,
    });

    this.httpClient
      .get<FilmSearchList>(`${this.appConfig.apiBaseUrl}?${params}`)
      .subscribe((result) => {
        return this._items.next(this.proccessApiResult(result));
      });
  }

  fetchInitialPage(): void {
    this.fetchSearchItems({ s: 'action' });
  }

  get items$(): Observable<FilmSearchList> {
    return this._items;
  }

  private proccessApiResult(searchList: FilmSearchList) {
    // Bit of a hack to display only 8 results at a time on the UI.
    // The API always returns 10 items and there is no way of setting
    // a limit to how many items you would like to be returned (with most APIs thats not the case).
    // There are various work around that but simply knocking of 2 items for the sake of the test.
    // In a real world application I wouldn't take this approach. Instead it would be good idea to setup
    // a proxy API which can take care of page sizing logic.
    // Wouldn't recommend putting that kind of logic in the UI.
    if (searchList && searchList.Search.length > 8) {
      searchList.Search.length = 8;
      return {
        Search: searchList.Search,
        totalResults: searchList.totalResults - 2,
      };
    }

    return searchList;
  }
}
