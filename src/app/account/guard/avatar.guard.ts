import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../core/auth/services/auth.service';

export const avatarGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const photoURL = localStorage.getItem('photoURL');

  if (authService.isAvatarExists(photoURL)) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
