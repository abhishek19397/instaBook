import firebase from "firebase";

require("firebase/firestore");

const config = {
  apiKey: "AIzaSyCz8Dc0Y_vyTKsyv4hmgNPUnnFXjqPk5NY",
  authDomain: "feedbook-a155f.firebaseapp.com",
  databaseURL: "https://feedbook-a155f.firebaseio.com",
  projectId: "feedbook-a155f",
  storageBucket: "feedbook-a155f.appspot.com",
  messagingSenderId: "362069413229",
  appId: "1:362069413229:web:5136fe5dc3bab163531e64",
  measurementId: "G-XK4D4EV92Y",
};

firebase.initializeApp(config);

const db = firebase.firestore();

//Need to add this to forgo deprecated warnings

export default db;
