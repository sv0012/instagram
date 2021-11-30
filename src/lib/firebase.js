import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config={
    apiKey: "AIzaSyDWLy_UhMOZLFhPp_k4UUyOdnmVd1RXRQ8",

    authDomain: "instagram-64526.firebaseapp.com",
  
    projectId: "instagram-64526",
  
    storageBucket: "instagram-64526.appspot.com",
  
    messagingSenderId: "643696292848",
  
    appId: "1:643696292848:web:10c7e5bf3a6c3c21d1a335"
  
}

const firebase = Firebase.initializeApp(config);
const {FieldValue} =Firebase.firestore;



export {firebase,FieldValue}