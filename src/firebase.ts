import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDVqN2RC6ARFkKvoJ4dIIjIvbYjUNX8nck',
  authDomain: 'pickly-7e63e.firebaseapp.com',
  projectId: 'pickly-7e63e',
  storageBucket: 'pickly-7e63e.appspot.com',
  messagingSenderId: '576246546436',
  appId: '1:576246546436:web:4d7cf0f3cf38cd2a4b7551',
  measurementId: 'G-ZJJDWNK5H4',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
