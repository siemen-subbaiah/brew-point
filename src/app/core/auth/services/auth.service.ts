import { inject, Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  User,
  user,
} from '@angular/fire/auth';
import { from, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth = inject(Auth);
  user$ = user(this.auth);
  currentUser!: User;
  profileChanged$ = new Subject<string>();

  loginOrRegister() {
    const promise = signInWithPopup(this.auth, new GoogleAuthProvider());
    promise.then((res) => {
      localStorage.setItem('uid', res.user.uid);
    });
    return from(promise);
  }

  updateAvatar(avatar: string) {
    const promise = updateProfile(this.currentUser, {
      photoURL: avatar,
    });
    return from(promise);
  }

  isAvatarExists(photoURL: string | null) {
    if (!photoURL) {
      return false;
    } else if (photoURL.includes('googleusercontent')) {
      return false;
    } else {
      return true;
    }
  }

  logout() {
    const promise = this.auth.signOut();
    promise.then(() => {
      localStorage.removeItem('uid');
    });
    return from(promise);
  }
}
