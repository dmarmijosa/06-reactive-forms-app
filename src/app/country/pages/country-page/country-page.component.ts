import { Component, effect, inject, signal } from '@angular/core';
import { CountryService } from '../../services/country.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Country } from '../../interfaces/country.interface';
import { filter, switchMap, tap } from 'rxjs';

interface countrySeach {
  region: string;
  country: string;
  border: string;
}

@Component({
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  private fb = inject(FormBuilder);
  private countryService = inject(CountryService);

  regions = signal(this.countryService.regions);

  countriesByRegion = signal<Country[]>([]);
  borders = signal<Country[]>([]);

  myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  });

  onFormChange = effect((onCleanUp) => {
    const regionSubscription = this.onRegionChange();
    const countrySubscription = this.onCountryChange();
    onCleanUp(() => {
      regionSubscription.unsubscribe();
      countrySubscription.unsubscribe();
    });
  });

  onRegionChange() {
    return this.myForm
      .get('region')!
      .valueChanges.pipe(
        tap(() => this.myForm.get('country')?.setValue('')),
        tap(() => this.myForm.get('border')?.setValue('')),
        tap(() => {
          this.borders.set([]);
          this.countriesByRegion.set([]);
        }),
        switchMap((region) =>
          this.countryService.getCountriesByRegion(region ?? '')
        )
      )
      .subscribe((countries) => this.countriesByRegion.set(countries));
  }

  onCountryChange() {
    return this.myForm
      .get('country')!
      .valueChanges.pipe(
        tap(() => this.myForm.get('border')?.setValue('')),
        filter(value => value!.length > 0),
        switchMap((alphaCode)=> this.countryService.getCountryByAlphaCode(alphaCode ?? '')),
        switchMap((country)=> this.countryService.getCountryNamesByCodeArray(country.borders))
      )
      .subscribe((borders)=> this.borders.set(borders));
  }
}
