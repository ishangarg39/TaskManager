import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from"firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyA4sQnYiYNu97uwOfa19MmVEknxfBRm6LA",
  authDomain: "taskmanager-89441.firebaseapp.com",
  projectId: "taskmanager-89441",
  storageBucket: "taskmanager-89441.appspot.com",
  messagingSenderId: "520712039628",
  appId: "1:520712039628:web:7f4ce1d6694ed91eca2669",
  measurementId: "G-25JQMM9Q9J"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth=getAuth();
const db = getFirestore(app);
const storage = getStorage(app);

export{ auth,app, db, storage};