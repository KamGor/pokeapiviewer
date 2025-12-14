import { Routes } from '@angular/router';
import { PokemonPage } from './pokemon-page/pokemon';
import { Abilities } from './abilities/abilities';
import { HabitatsPage } from './habitats-page/habitats';
import { ListPage } from './list-page/list';
import { BerriesPage } from './berries-page/berries';
import { Locations } from './locations/locations';
import { SearchAutocomplete } from './search-autocomplete/search-autocomplete';
import { NotFoundPage } from './notFound-page/not-found-page';
import { App } from './app';

export const routes: Routes = [
  {
    component: SearchAutocomplete,
    path: 'SearchAutocomplete',
  },
  {
    path: 'habitats',
    component: HabitatsPage,
    children: [
      {
        path: ':name',
        component: HabitatsPage,
      },
    ],
  },
  {
    path: 'abilities/:name',
    component: Abilities,
  },
  {
    path: 'locations',
    component: Locations,
  },
  {
    path: 'berries',
    component: BerriesPage,
  },

  {
    component: PokemonPage,
    path: 'pokemon/:name',
  },

  {
    component: ListPage,
    title: 'List',
    path: 'list',
    children: [
      {
        path: 'berries',
        component: BerriesPage,
      },
      {
        path: 'locations',
        component: Locations,
      },
    ],
  },
  { path: '**', component: NotFoundPage, redirectTo: '' },
];
