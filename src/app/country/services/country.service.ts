import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { combineLatest, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private base_url = environment.BASE_URL;
  private http = inject(HttpClient);

  private _regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get regions(): string[] {
    return [...this._regions];
  }

  getCountriesByRegion(region: string): Observable<Country[]> {
    if (!region) return of([]);

    return this.http.get<Country[]>(
      `${this.base_url}/region/${region}?fields=cca3,name,borders`
    );
  }

  getCountryByAlphaCode(alphaCode: string): Observable<Country> {
    return this.http.get<Country>(
      `${this.base_url}/alpha/${alphaCode}?fields=cca3,name,borders`
    );
  }

  getCountryNamesByCodeArray(countriesCodes: string[]): Observable<Country[]> {
    if (!countriesCodes || countriesCodes.length === 0) return of([]);
    const _countriesResquest: Observable<Country>[] = [];
    countriesCodes.forEach((code) => {
      const request = this.getCountryByAlphaCode(code);
      _countriesResquest.push(request);
    });

    return combineLatest(_countriesResquest);
  }
}
