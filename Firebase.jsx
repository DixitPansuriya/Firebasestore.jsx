import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAyoTVoKJOWhOfX3_0kGo3Hk2p14VsIoXo",
    authDomain: "sign-in-df1d2.firebaseapp.com",
    projectId: "sign-in-df1d2",
    storageBucket: "sign-in-df1d2.appspot.com",
    messagingSenderId: "863142986567",
    appId: "1:863142986567:web:67bb275e66abe49e7b4262"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, GoogleAuthProvider, signInWithPopup };
