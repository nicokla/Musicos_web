import firebase from 'firebase'
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyB-ugzs0fRFAj7ZRWJkBrQBWatI0UiqpeA",
  authDomain: "essaifirebase-ea4fa.firebaseapp.com",
  databaseURL: "https://essaifirebase-ea4fa.firebaseio.com",
  projectId: "essaifirebase-ea4fa",
  storageBucket: "essaifirebase-ea4fa.appspot.com",
  messagingSenderId: "845227245926",
  appId: "1:845227245926:web:2909b5b7ee98d982a3c8a7"
};

const db = firebase.initializeApp(firebaseConfig).firestore();
export {db, firebase}

// (async () => {
//   await firebase.auth().signInWithEmailAndPassword("nicolas.klarsfeld@gmail.com","coucou123")
// })()