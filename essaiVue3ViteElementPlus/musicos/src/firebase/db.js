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
  return getCurrentUser() == undefined
}

function getMyId(){
  return getCurrentUser().uid || ''
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

async function saveSongToStorage(object, id){
  var storageRef = firebase.storage().ref();
  var ref = storageRef.child('songs/' + id);
  try{
    await ref.putString(JSON.stringify(object))
  }catch(error){
    console.log(error)
    throw error
  }
}

let defaultSongStorage = {
  "chordNames":["+","","-","","-","+","","+","","-","","dim","Δ","","m7","","m7","Δ","","7","","m7","","ø","Δ","","m7","","m7","Δ","","7","","m7","","ø"],
  "chordsNotes":[[0,4,7],[],[2,5,9],[],[4,7,11],[5,9,12],[],[7,11,14],[],[9,12,16],[],[11,14,17],[0,4,7,11],[],[5,12,9,2],[],[7,4,11,14],[12,5,16,9],[],[17,7,11,14],[],[19,16,9,12],[],[14,21,17,11],[0,4,7,11],[],[5,12,9,2],[],[7,4,11,14],[12,5,16,9],[],[17,7,11,14],[],[19,16,9,12],[],[14,21,17,11]],
  "chordsRoots":[true,false,true,false,true,true,false,true,false,true,false,true],
  "instru1_n":0,
  "instru2_n":0,
  "noteNames":0,
  "notes":[
    // {"duration":0.08333331,"midiNote":50,"start":0.9166667,"velocity":100},
    // {"duration":0.07500005,"midiNote":51,"start":1.2083334,"velocity":100},
    // {"duration":0.09166658,"midiNote":52,"start":1.4583334,"velocity":100}
  ],
  "notesAccompagnement":[],
  "rootNote":48,
  "scale":[true,true,true,true,true,true,true,true,true,true,true,true],
  "showChords":0,
  "volumePlayer":100,
  "volumeRecording":90,
  "volumeYoutube":0.9
}


async function saveSongToFirestore(object, id){
  try{
    await db.collection("songs").doc(id).set(object)
  }catch(error){
    console.log(error)
    throw error
  }
}

let defaultSongFirestore = {
  datetime: 0,
  duration: 60,
  imageUrl: '',
  objectID: '',
  originalID: '',
  ownerID: '',
  ownerName: '',
  title: '',
  videoID: ''
}

async function getUserName(id){
  let doc = await db.collection("users").doc(id).get()
  if(doc.exists){
    let object = doc.data()
    return object.name
  }
  else{
    console.log('error 12345')
    throw 'error 12345'
  }
}


let db = {}
if(firebase.apps.length === 0){ // initialize app if needed
  db = firebase.initializeApp(firebaseConfig).firestore();
}else{
  db = firebase.firestore()
}

// detectIfConnected()
// setupShouldStayLoggedIn()
export {db, firebase, logOut, getCurrentUser, 
        isLoggedIn, setupShouldStayLoggedIn, 
        detectIfConnected, 
        saveSongToStorage, defaultSongStorage, 
        saveSongToFirestore, defaultSongFirestore,
        getUserName, getMyId}

// (async () => {
//   await firebase.auth().signInWithEmailAndPassword("nicolas.klarsfeld@gmail.com","coucou123")
// })()