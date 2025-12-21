import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ListPageComponent } from './list-page/list-page.component';
import { CharacteristicPageComponent } from './characteristic-page/characteristic-page.component';
import { FlingEffectsPageComponent } from './fling-effects-page/fling-effects-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'list-page',
    component: ListPageComponent,
  },
  {
    path: 'item-page',
    component: CharacteristicPageComponent,
  },
  {
    path: 'fling-effects-page',
    component: FlingEffectsPageComponent,
  },
];
