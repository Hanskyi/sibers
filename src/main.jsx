import {createContext, StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB6v_8fNtXBBpmUT9uIOrlVHMF8nw7DCQs",
    authDomain: "sibers-test-base.firebaseapp.com",
    databaseURL: "https://sibers-test-base-default-rtdb.firebaseio.com",
    projectId: "sibers-test-base",
    storageBucket: "sibers-test-base.firebasestorage.app",
    messagingSenderId: "650046032480",
    appId: "1:650046032480:web:4f063e258939ccf7c0d105"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);

export const Context  = createContext(null);


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Context.Provider  value={{firestore}}>
          <App />
      </Context.Provider >

  </StrictMode>,
)
