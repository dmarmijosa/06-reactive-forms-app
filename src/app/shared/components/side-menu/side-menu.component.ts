import { Component } from '@angular/core';
import { reactiveRoutes } from '../../../reactive/reactive.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

interface MenuItem {
  title: string;
  route: string;
}

const reactiveItems = reactiveRoutes[0].children ?? [];

@Component({
  selector: 'shared-side-menu',
  imports: [RouterLink, RouterLinkActive, TitleCasePipe],
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {
  reactiveMenu: MenuItem[] = reactiveItems
  .filter((route) => route.path !== '**')
  .map((route) => ({
    route: `reactive/${route.path}`,
    title: `${route.title}`,
  }));

  authMenu: MenuItem[] = [
    { route: './auth', title: 'Registro' },
  ]

  countryMenu: MenuItem[] = [
    { route: './country', title: 'Países' },
  ]
}
