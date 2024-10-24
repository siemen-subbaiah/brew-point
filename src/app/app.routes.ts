import { Routes } from '@angular/router';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { loggedInGuardGuard } from './core/utils/login.guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./core/auth/screens/login-screen/login-screen.component').then(
        (m) => m.LoginScreenComponent
      ),
    canActivate: [loggedInGuardGuard],
  },
  {
    path: '',
    loadComponent: () =>
      import('./home/screens/home-screen/home-screen.component').then(
        (m) => m.HomeScreenComponent
      ),
    canActivate: [AuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin,
    },
  },
  {
    path: 'cafes',
    canActivate: [AuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin,
    },
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './cafes/screens/cafe-home-screen/cafe-home-screen.component'
          ).then((m) => m.CafeHomeScreenComponent),
      },
      {
        path: ':id',
        loadComponent: () =>
          import(
            './cafes/screens/cafe-detail-screen/cafe-detail-screen.component'
          ).then((m) => m.CafeDetailScreenComponent),
      },
    ],
  },
];
