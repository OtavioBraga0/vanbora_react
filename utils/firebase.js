import firebase from 'firebase';

const prodConfig = {
    apiKey: "AIzaSyD0rpOX-kL91gNIwf0PBApIA904f1TMdGk",
    authDomain: "vanbora-4a2fa.firebaseapp.com",
    databaseURL: "https://vanbora-4a2fa.firebaseio.com",
    projectId: "vanbora-4a2fa",
    storageBucket: "",
    messagingSenderId: "1063306689031",
    appId: "1:1063306689031:web:68b1674b113112ac"
};

const devConfig = {
    apiKey: "AIzaSyD0rpOX-kL91gNIwf0PBApIA904f1TMdGk",
    authDomain: "vanbora-4a2fa.firebaseapp.com",
    databaseURL: "https://vanbora-4a2fa.firebaseio.com",
    projectId: "vanbora-4a2fa",
    storageBucket: "",
    messagingSenderId: "1063306689031",
    appId: "1:1063306689031:web:68b1674b113112ac"
};

const config = process.env.NODE_ENV === 'production'
    ? prodConfig
    : devConfig;

export const firebaseImpl = firebase.initializeApp(config);
export const firebaseDatabase = firebase.database();
export const firebaseAuth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();