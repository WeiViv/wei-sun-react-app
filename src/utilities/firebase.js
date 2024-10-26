import { useCallback, useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, update } from 'firebase/database';
import { getAnalytics } from "firebase/analytics";

import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyC0JgjKavj6fky5dye1z3CkzlELTEc_PEg",
    authDomain: "wei-sun-react-app-9d712.firebaseapp.com",
    databaseURL: "https://wei-sun-react-app-9d712-default-rtdb.firebaseio.com",
    projectId: "wei-sun-react-app-9d712",
    storageBucket: "wei-sun-react-app-9d712.appspot.com",
    messagingSenderId: "295868619058",
    appId: "1:295868619058:web:fe5d1c65d7bc3d8c2ddf2b",
    measurementId: "G-YRETQ16F7V"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);
const database = getDatabase(firebase);
export const useDbData = (path) => {
    const [data, setData] = useState();
    const [error, setError] = useState(null);
    useEffect(() => (
        onValue(ref(database, path), (snapshot) => {
        setData(snapshot.val());
        }, (error) => {
        setError(error);
        })
    ), [path]);
    return [data, error];
};

const makeResult = (status, error = null) => {
    const timestamp = Date.now();
    const message = error ? error.message : `Updated: ${new Date(timestamp).toLocaleString()}`;
    return { status, timestamp, error, message };
};

export const useDbUpdate = (path) => {
    const [result, setResult] = useState(null);
    const updateData = useCallback((value) => {
        // Set status to 'pending' before the update begins
        setResult(makeResult('pending'));

        update(ref(database, path), value)
            .then(() => {
                setResult(makeResult('success'));
            })
            .catch((error) => {
                setResult(makeResult('error', error));
            });
    }, [path]);

    return [updateData, result];
};


export const signInWithGoogle = () => {
    signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
    };
    
    const firebaseSignOut = () => signOut(getAuth(firebase));
    
    export { firebaseSignOut as signOut };
    
    export const useAuthState = () => {
        const [user, setUser] = useState();
        
        useEffect(() => (
        onAuthStateChanged(getAuth(firebase), setUser)
        ), []);
    
        return [user];
};