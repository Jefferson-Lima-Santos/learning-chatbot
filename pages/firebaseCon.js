// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import 'firebase/firestore';
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvbgKirgrfUfgYsFLMDW-XgrrXnDaVGZo",
  authDomain: "sebprojeto-4f7f0.firebaseapp.com",
  projectId: "sebprojeto-4f7f0",
  storageBucket: "sebprojeto-4f7f0.appspot.com",
  messagingSenderId: "452563889755",
  appId: "1:452563889755:web:20aae31db56b9e6fe5d97e"
};

// Initialize Firebase


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

