import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDd-EeEJAPsgjIyuVcyz2xUy9hVFJ_GH6E",
  authDomain: "learnup-f7d5b.firebaseapp.com",
  projectId: "learnup-f7d5b",
  storageBucket: "learnup-f7d5b.appspot.com",
  messagingSenderId: "797999360870",
  appId: "1:797999360870:web:693e40810f0d7aca80b6a7",
  measurementId: "G-KHD5V7E3B3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
