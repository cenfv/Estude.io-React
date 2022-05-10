import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC-7rxQiwdzaS71kZwYmPSQ8jzR4__tQvM",
  authDomain: "estudeio.firebaseapp.com",
  projectId: "estudeio",
  storageBucket: "estudeio.appspot.com",
  messagingSenderId: "53777809050",
  appId: "1:53777809050:web:a1a70bb5a81b9602d06923",
  measurementId: "G-WY2BZHB7WH",
};
// Initialize Firebase

export default firebase.initializeApp(firebaseConfig);
//firebase.analytics();
