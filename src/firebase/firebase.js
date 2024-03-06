// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyCYIzJae-PGXeGKgnTL0qE-tGPlfLoKTUE",
  authDomain: "chat-app-e9e49.firebaseapp.com",
  projectId: "chat-app-e9e49",
  storageBucket: "chat-app-e9e49.appspot.com",
  messagingSenderId: "82148739112",
  appId: "1:82148739112:web:53c9366921352d3c230d1d",
  measurementId: "G-7XN8CEFE54",
  databaseURL:"https://chat-app-e9e49-default-rtdb.firebaseio.com/"
};

 export const app = initializeApp(firebaseConfig);