import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDRfCQXdCixXPrWB56nolDi8nbC_FhpKMI',
  authDomain: 'chatterbox-5841a.firebaseapp.com',
  projectId: 'chatterbox-5841a',
  storageBucket: 'chatterbox-5841a',
  messagingSenderId: '"1095977468590"',
  appId: '1:1095977468590:web:b0cba9c35c6d3cb04e233f',
};

// initialize firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();