import { inject, Injectable } from '@angular/core';
import {
  Auth,
  authState,
  GoogleAuthProvider,
  signInWithPopup,
  user,
} from '@angular/fire/auth';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth = inject(Auth);
  user$ = user(this.auth);
  currentUser!: { email: string; displayName: string };

  loginOrRegister() {
    const promise = signInWithPopup(this.auth, new GoogleAuthProvider());
    promise.then((res) => {
      localStorage.setItem('uid', res.user.uid);
    });
    return from(promise);
  }

  logout() {
    const promise = this.auth.signOut();
    promise.then(() => {
      localStorage.removeItem('uid');
    });
    return from(promise);
  }
}
