import { Routes } from '@angular/router';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { loggedInGuardGuard } from './core/guards/login.guard';
import { avatarGuard } from './account/guard/avatar.guard';

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
    path: 'avatar',
    loadComponent: () =>
      import('./avatar/screens/avatar-screen/avatar-screen.component').then(
        (m) => m.AvatarScreenComponent
      ),
    canActivate: [AuthGuard, avatarGuard],
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
  {
    path: 'cart',
    loadComponent: () =>
      import('./cart/screens/cart-screen/cart-screen.component').then(
        (m) => m.CartScreenComponent
      ),
    canActivate: [AuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin,
    },
  },
  {
    path: 'account',
    loadComponent: () =>
      import('./account/screens/account-screen/account-screen.component').then(
        (m) => m.AccountScreenComponent
      ),
    canActivate: [AuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin,
    },
  },
];
