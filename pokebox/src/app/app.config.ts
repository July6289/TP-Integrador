import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { initializeApp } from "firebase/app";

import { routes } from './app.routes';
import { HttpClient, provideHttpClient } from '@angular/common/http';

import {AngularFireModule} from '@angular/fire/compat'

import {AngularFirestoreModule} from '@angular/fire/compat/firestore'


const firebaseConfig = {

  apiKey: "AIzaSyCOXyPFN7y-wnwZPVclSLPgaGEPaWMDZVM",

  authDomain: "authentication-52b69.firebaseapp.com",

  projectId: "authentication-52b69",

  storageBucket: "authentication-52b69.firebasestorage.app",

  messagingSenderId: "724456979490",

  appId: "1:724456979490:web:f41fb62d72831b4a1bde7b"

};
initializeApp(firebaseConfig)

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  provideHttpClient(),
importProvidersFrom(
HttpClient,
AngularFireModule.initializeApp(firebaseConfig),
AngularFirestoreModule
)]
};
