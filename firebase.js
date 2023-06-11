import { initializeApp, getApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDRfCQXdCixXPrWB56nolDi8nbC_FhpKMI',
  authDomain: 'chatterbox-5841a.firebaseapp.com',
  projectId: 'chatterbox-5841a',
  storageBucket: 'chatterbox-5841a',
  messagingSenderId: '"1095977468590"',
  appId: '1:1095977468590:web:b0cba9c35c6d3cb04e233f',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = initializeFirestore(app, {experimentalForceLongPolling: true});

export { db, auth };