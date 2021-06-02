import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseClientConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseUrl: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseClientConfig);
} else {
  firebase.app();
}

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db, firebase };
