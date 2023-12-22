// // Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
// // import { storage } from 'firebase/storage';
// // import 'firebase/storage';
// import { getDatabase } from 'firebase/database';
// import { getStorage } from 'firebase/storage';
// import { getAuth } from 'firebase/auth';

// export const firebaseConfig = {
//     // apiKey: 'AIzaSyCcdZr4DDyZBOuQn_LCN6hLnI5JFGEbM6M',
//     // authDomain: 'doan-a127c.firebaseapp.com',
//     // projectId: 'doan-a127c',
//     // storageBucket: 'doan-a127c.appspot.com',
//     // messagingSenderId: '66553430569',
//     // appId: '1:66553430569:web:a765d07d5fc0c1d8a89238',
//     apiKey: "AIzaSyCxgMd8fwmA_oLyw9fINu1QNrgAGrga1kM",
//     authDomain: "newproject-c8af3.firebaseapp.com",
//     databaseURL: "https://newproject-c8af3-default-rtdb.firebaseio.com",
//     projectId: "newproject-c8af3",
//     storageBucket: "newproject-c8af3.appspot.com",
//     messagingSenderId: "750380295040",
//     appId: "1:750380295040:web:0b582e1719b54b965f1765",
//     measurementId: "G-FEHEXRLBF8"
// };

// export const app = initializeApp(firebaseConfig);
// // Initialize Firebase
// export const dbRealtime = getDatabase(app);
// export const db = getFirestore(app);
// // export const storageInstance = storage();
// export const storage = getStorage(app);
// export const auth = getAuth(app);


// import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app'
import { getDatabase } from "firebase/database";

import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
// import 'firebase/compat/storage';

// import 'firebase/auth';

const firebaseConfig = {
  // Cấu hình Firebase của bạn
      apiKey: "AIzaSyCxgMd8fwmA_oLyw9fINu1QNrgAGrga1kM",
      authDomain: "newproject-c8af3.firebaseapp.com",
      databaseURL: "https://newproject-c8af3-default-rtdb.firebaseio.com",
      projectId: "newproject-c8af3",
      storageBucket: "newproject-c8af3.appspot.com",
      messagingSenderId: "750380295040",
      appId: "1:750380295040:web:0b582e1719b54b965f1765",
      measurementId: "G-FEHEXRLBF8"
};
// firebase.initializeApp(firebaseConfig);
const app=firebase.initializeApp(firebaseConfig);
export default firebase;
// const database = firebase.database();

export const database = getDatabase();
// export database;
export const storage = getStorage(app);
export const auth = getAuth(app);
// export { database };
// const db = database();
// export {db};
// const storage = firebase.storage();
// export { storage };
// export const storage = getStorage(app);
// const auth = firebase.auth();
// export { auth };