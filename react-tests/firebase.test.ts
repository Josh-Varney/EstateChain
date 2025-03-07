import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { app, auth, provider, db } from '../src/firebase/firebase';

jest.mock('firebase/app', () => ({
    initializeApp: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(() => ({ currentUser: { uid: 'user123' } })),
    GoogleAuthProvider: jest.fn().mockImplementation(() => ({ providerId: 'google.com' })),
}));

jest.mock('firebase/firestore', () => ({
    getFirestore: jest.fn(),
}));

describe('Firebase Initialization', () => {
    it('should initialize Firebase with the correct configuration', () => {
        expect(initializeApp).toHaveBeenCalledWith({
            apiKey: process.env.REACT_APP_API_KEY,
            authDomain: process.env.REACT_APP_AUTH_DOMAIN,
            projectId: process.env.REACT_APP_PROJECT_ID,
            storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
            messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
            appId: process.env.REACT_APP_APP_ID,
            measurementId: process.env.REACT_APP_MEASUREMENT_ID,
        });
        expect(initializeApp).toHaveBeenCalledTimes(1);
    });

    it('should initialize Auth, Firestore, and GoogleAuthProvider', () => {
        expect(getAuth).toHaveBeenCalledWith(app);
        expect(getAuth).toHaveBeenCalledTimes(1);

        expect(getFirestore).toHaveBeenCalledWith(app);
        expect(getFirestore).toHaveBeenCalledTimes(1);

        expect(GoogleAuthProvider).toHaveBeenCalledTimes(1);
    }); 
});
