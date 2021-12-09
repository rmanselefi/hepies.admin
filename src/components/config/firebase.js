import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyCenZ08rhShbYrHlWA533nNxieH-lG0w_w",
  authDomain: "hepies-d3233.firebaseapp.com",
  projectId: "hepies-d3233",
  storageBucket: "hepies-d3233.appspot.com",
  messagingSenderId: "222366169871",
  appId: "1:222366169871:web:290df655e19e3b2bd51c7a",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();
firebase.storage();
export default firebase;
