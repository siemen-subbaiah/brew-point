import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/screens/home-screen/home-screen.component').then(
        (m) => m.HomeScreenComponent
      ),
  },
  {
    path: 'cafes',
    loadComponent: () =>
      import(
        './restaurants/screens/restaurant-home-screen/restaurant-home-screen.component'
      ).then((m) => m.RestaurantHomeScreenComponent),
  },
];
