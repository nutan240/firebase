
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAe9rC1nZrbi03G4LVSEr4chHBIOUyP5eU",
  authDomain: "fir-crud-cf42e.firebaseapp.com",
  projectId: "fir-crud-cf42e",
  storageBucket: "fir-crud-cf42e.appspot.com",
  messagingSenderId: "96010567576",
  appId: "1:96010567576:web:b905d62198d131a9be75ed"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { app ,auth} ;