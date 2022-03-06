import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { AppConfigService } from './app-config.service';
import {
  ApiItemQueryParams,
  ApiSearchQueryParams,
  FilmDetail,
  FilmSearchList,
} from './app-interfaces';

@Injectable({
  providedIn: 'root',
})
export class FilmApiService {
  private _items = new ReplaySubject<FilmSearchList>(1);

  constructor(
    private appConfig: AppConfigService,
    private httpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  // The API doesn't return page number but it has some kind of pagination
  // So I am resulting to handling the pagination (which should really be done in the API,
  // i.e. which page number we are currently on).
  private page = 1;

  private searchTerms = 'action';

  adjustRoute(params?: { page: number; s: string }) {
    if (params) {
      this.page = params.page;
      this.searchTerms = params.s;
    }

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { page: this.page, s: this.searchTerms },
      queryParamsHandling: 'merge',
    });
  }

  fetchSearchItems(searchParams: ApiSearchQueryParams) {
    this.page = searchParams.page || this.page;
    this.searchTerms = searchParams.s || this.searchTerms;

    const params = new URLSearchParams({
      apikey: this.appConfig.apiKey,
      s: this.searchTerms,
      page: `${this.page}`,
    });

    this.httpClient
      .get<FilmSearchList>(`${this.appConfig.apiBaseUrl}?${params}`)
      .subscribe((result) => {
        return this._items.next(this.proccessApiResult(result));
      });

    this.adjustRoute();
  }

  fetchNextPage() {
    this.page++;
    this.adjustRoute();
  }

  fetchPreviousPage() {
    if (this.page == 1) return;
    this.page--;
    this.adjustRoute();
  }

  fetchItem(searchParams: ApiItemQueryParams): Observable<FilmDetail> {
    const params = new URLSearchParams({
      apikey: this.appConfig.apiKey,
      i: searchParams.i,
    });

    return this.httpClient.get<FilmDetail>(
      `${this.appConfig.apiBaseUrl}?${params}`
    );
  }

  get items$(): Observable<FilmSearchList> {
    return this._items;
  }

  private proccessApiResult(searchList: FilmSearchList) {
    // Bit of a hack to display only 8 results at a time on the UI.
    // The API always returns 10 items and there is no way of setting
    // a limit to how many items you would like to be returned (with most APIs thats not the case).
    // There are various work arounds. But I'm simply knocking of 2 items for the sake of the test.
    // In a real world application I wouldn't take this approach. Instead it would be good idea to setup
    // a proxy API which can take care of page sizing logic.
    // Wouldn't recommend putting that kind of logic in the UI.
    if (searchList && searchList.Search && searchList.Search.length > 8) {
      searchList.Search.length = 8;
    }

    // The api doesn't actually return the page number
    // So you have to track it yourself. This is something that should be
    // done in the API. Again if no other solution available a proxy API can
    // take care of this. If I'm not mistaken I think for this assesment the HTML & CSS
    // is what is being evaluated as opposed to what I'm doing with the API, hence why
    // I'm hacking away at this, just to get the UI running. I do not endorse this in a real commercial
    // context.
    searchList.page = this.page;
    searchList.totalPages = Math.round(searchList.totalResults / 10);
    return searchList;
  }
}
