const firebaseConfig = {
  apiKey: 'AIzaSyBZXwa__1dcRSFYw7wlItH2hSevu2CEDCo',
  authDomain: 'nodewithfirebase-6e669.firebaseapp.com',
  projectId: 'nodewithfirebase-6e669',
  storageBucket: 'nodewithfirebase-6e669.appspot.com',
  messagingSenderId: '331392636647',
  appId: '1:331392636647:web:5412f521a4a36e806f3442',
  measurementId: 'G-8ERFNJ8LRK'
}

import firebase from 'firebase/app'
import 'firebase/storage'
firebase.initializeApp(firebaseConfig)
export default firebase
