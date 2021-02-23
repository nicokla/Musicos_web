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

async function logOut(){
  // localStorage.removeItem("userID")
  await firebase.auth().signOut()
}

function getCurrentUser(){
  return firebase.auth().currentUser
}

function isLoggedIn(){
  return currentUser() == undefined
}


async function setupShouldStayLoggedIn(){
  let shouldStayLoggedIn = JSON.parse(localStorage.getItem("shouldStayLoggedIn"))
  if(shouldStayLoggedIn){
    console.log('coucou')
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .catch((error) => {
      console.error(error)
    });
  } 
  else {
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .catch((error) => {
      console.error(error)
    });
  }
}

function detectIfConnected(){
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log('user!!', user)
      localStorage.setItem("shouldLogIn", "true")
      // functionLoggedIn()
    } else {
      localStorage.removeItem("shouldLogIn")
      // functionLoggedOut()
    }
  });
}

const db = firebase.initializeApp(firebaseConfig).firestore();
// detectIfConnected()
// setupShouldStayLoggedIn()
export {db, firebase, logOut, getCurrentUser, isLoggedIn, setupShouldStayLoggedIn, detectIfConnected} // 

(async () => {
  await firebase.auth().signInWithEmailAndPassword("nicolas.klarsfeld@gmail.com","coucou123")
})()