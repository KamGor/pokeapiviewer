import { Routes } from '@angular/router';
import { Search } from './search/search';
import { PokemonPage } from './pokemon-page/pokemon';
import { Abilities } from './abilities/abilities';
import { HabitatsPage } from './habitats-page/habitats';
import { ListPage } from './list-page/list';
import { BerriesPage } from './berries-page/berries';
import { Locations } from './locations/locations';
import { SearchAutocomplete } from './search-autocomplete/search-autocomplete';

export const routes: Routes = [
  {
    component: Search,
    path: 'search',
  },
  {
    component: PokemonPage,
    path: 'pokemon/:name',
    children: [
      {
        path: 'habitats',
        component: HabitatsPage,
      },
      {
        path: 'abilities',
        component: Abilities,
      },
    ],
  },
  {
    path: 'habitats/:name',
    component: HabitatsPage,
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
  {
    component: SearchAutocomplete,
    path: 'SearchAutocomplete',
  },
];
