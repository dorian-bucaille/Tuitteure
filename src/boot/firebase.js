// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCtSyl4S6LXrKr0UEHP2N0-aXTxZ2OyHbI",
  authDomain: "tuitteure.firebaseapp.com",
  projectId: "tuitteure",
  storageBucket: "tuitteure.appspot.com",
  messagingSenderId: "889294949099",
  appId: "1:889294949099:web:492b604e52511a092bccae"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

let db = firebase.firestore()

export default db