import { initializeApp, getApp } from "firebase/app";
import {
  getAuth,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyATrUV17itU6Ax0wBx11qFr4LoxoY0Qo3k",
  authDomain: "music-player-d5a78.firebaseapp.com",
  projectId: "music-player-d5a78",
  storageBucket: "music-player-d5a78.appspot.com",
  messagingSenderId: "742775738046",
  appId: "1:742775738046:web:88250fd89a9b2261a798ef",
  measurementId: "G-LPH0QMKY9V"
};

// Initialize Firebase
function createFirebaseApp(config) {
  try {
    return getApp();
  } catch {
    return initializeApp(config);
  }
}

const firebaseApp = createFirebaseApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp)

export { firebaseApp, firebaseAuth };
