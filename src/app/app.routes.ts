import { Routes } from '@angular/router';
import { Search } from './search/search';
import { Pokemon } from './pokemon/pokemon';
import { Abilities } from './abilities/abilities';
import { Habitats } from './habitats/habitats';
import { List } from './list/list';
import { Berries } from './berries/berries';
import { Locations } from './locations/locations';
import { SearchAutocomplete } from './search-autocomplete/search-autocomplete';

export const routes: Routes = [
  {
    component: Search,
    path: 'search/:name',
  },
  {
    component: Pokemon,
    path: 'pokemon/:name',
    children: [
      {
        path: 'abilities',
        component: Abilities,
      },
      {
        path: 'habitats',
        component: Habitats,
      },
    ],
  },
  // {
  //   component: Abilities,
  //   path: 'abilities',
  // },
  {
    component: Habitats,
    path: 'habitats',
  },
  {
    component: List,
    path: 'list',
  },
  {
    component: Berries,
    path: 'berries',
  },
  {
    component: Locations,
    path: 'locations',
  },
  {
    path: '**',
    component: SearchAutocomplete,
    //   // redirectTo: '',
  },
  //   children: [
  //     {
  //       path: 'pokemon:name',
  //       component: Pokemon,
  //     },
  //   ],
  //   // redirectTo: '',
  // },
];
