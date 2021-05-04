import React from 'react';
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage"


const config = {
    apiKey: "AIzaSyCfou51UjPzrxWbgxaS7bLbiuvOgRXJr88",
    authDomain: "fcidatabase-e3270.firebaseapp.com",
    databaseURL: "https://fcidatabase-e3270-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "fcidatabase-e3270",
    storageBucket: "fcidatabase-e3270.appspot.com",
    messagingSenderId: "878546075886",
    appId: "1:878546075886:web:94bfacb1514a4d610c73ff",
    measurementId: "G-5092HEF2K5"
};


function initFirebase() {
    if(!firebase.apps.length){
        firebase.initializeApp(config);
    }
}

initFirebase()

const storage = firebase.storage()



export { storage, firebase as default }