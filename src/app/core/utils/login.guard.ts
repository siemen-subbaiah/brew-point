import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loggedInGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const uid = localStorage.getItem('uid');

  if (uid) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
