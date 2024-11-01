import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { provideNgxStripe } from 'ngx-stripe';
import { provideHttpClient } from '@angular/common/http';
import { provideLottieOptions } from 'ngx-lottie';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: 'AIzaSyCHpsKNoE1sm-dMObBuQwgR8EmxNn1ipGQ',
        authDomain: 'coffee-app-be9db.firebaseapp.com',
        projectId: 'coffee-app-be9db',
        storageBucket: 'coffee-app-be9db.appspot.com',
        messagingSenderId: '3633024654',
        appId: '1:3633024654:web:4c07ad9347be2895e203df',
      }),
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideNgxStripe(
      'pk_test_51Ilv6oSHhqDlROxhLr2DwR1ULEsF7spTfQL7ATDCasOHrEkuOtwuEmAKVPSEDzZhkduQE4LwGdUrlVJJBb8T4W3300Bki7GhKP',
    ),
    provideHttpClient(),
    provideLottieOptions({
      player: () => import('lottie-web'),
    }),
  ],
};
