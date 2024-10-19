import { useCallback, useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, update } from 'firebase/database';
import { getAnalytics } from "firebase/analytics";

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
const makeResult = (error) => {
    const timestamp = Date.now();
    const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
    return { timestamp, error, message };
};
export const useDbUpdate = (path) => {
    const [result, setResult] = useState();
    const updateData = useCallback((value) => {
        update(ref(database, path), value)
        .then(() => setResult(makeResult()))
        .catch((error) => setResult(makeResult(error)))
    }, [database, path]);
    return [updateData, result];
};