import firebase from 'firebase'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDgC2ppuflUtPAW_k-fR8vcCBUX2u8URUI",
    authDomain: "mern-project-9e3a1.firebaseapp.com",
    projectId: "mern-project-9e3a1",
    storageBucket: "mern-project-9e3a1.appspot.com",
    messagingSenderId: "734788724575",
    appId: "1:734788724575:web:76f94ff8d11911192078ea",
    measurementId: "G-4YHR2V5EGE"
  };

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export { storage, firebase as default }