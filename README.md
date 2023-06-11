# Chatterbox

- A React Native chat app with firebase integration 

## How to clone

Clone the repo
```
git clone https://github.com/joewhocodes/chatterbox.git
```

cd into the just created project and install dependencies with yarn
```
cd chatterbox && npm install
```

Add your firebase backend config in the `firebase.js` file
```
const firebaseConfig = {
  apiKey:
  authDomain:
  projectId: 
  storageBucket: 
  messagingSenderId: 
  appId: 
  databaseURL: 
};
```

Run the project
```
npx react-native run-android
```
