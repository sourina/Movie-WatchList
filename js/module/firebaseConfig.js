//configuring firestore to application

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

//web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcFBqrx6xBWW9PMjK4vUhyDcrsuVoxySE",
  authDomain: "movie-wishlist-80d55.firebaseapp.com",
  projectId: "movie-wishlist-80d55",
  storageBucket: "movie-wishlist-80d55.appspot.com",
  messagingSenderId: "584613629611",
  appId: "1:584613629611:web:64e81056114dcddaba71ee",
};

// Initializing Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
