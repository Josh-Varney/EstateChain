import { User, UserCredential } from 'firebase/auth';

export const getAuth = jest.fn(() => ({}));

// Define a complete mock UserCredential object
export const signInWithEmailAndPassword = jest.fn((auth, email: string, password: string): Promise<UserCredential> => {
    return Promise.resolve({
        user: {
            uid: '67890',
            email: email,
            displayName: 'Test User',
            emailVerified: false,
            isAnonymous: false,
            metadata: {
                creationTime: '2023-01-01T00:00:00.000Z',
                lastSignInTime: '2023-01-01T00:00:00.000Z',
            },
            phoneNumber: null,
            photoURL: null,
            providerData: [],
            providerId: 'firebase', // Added providerId for User type compatibility
            refreshToken: 'fake-refresh-token',
            tenantId: null,
            delete: jest.fn(),
            getIdToken: jest.fn(() => Promise.resolve('fake-id-token')),
            getIdTokenResult: jest.fn(),
            reload: jest.fn(),
            toJSON: jest.fn(),
        } as User, // Cast to User type
        providerId: 'firebase',
        operationType: 'signIn',
    });
});

export const createUserWithEmailAndPassword = jest.fn((auth, email: string, password: string): Promise<UserCredential> => {
    return Promise.resolve({
        user: {
            uid: '12345',
            email: email,
            displayName: 'New User',
            emailVerified: false,
            isAnonymous: false,
            metadata: {
                creationTime: '2023-01-01T00:00:00.000Z',
                lastSignInTime: '2023-01-01T00:00:00.000Z',
            },
            phoneNumber: null,
            photoURL: null,
            providerData: [],
            providerId: 'firebase',
            refreshToken: 'fake-refresh-token',
            tenantId: null,
            delete: jest.fn(),
            getIdToken: jest.fn(() => Promise.resolve('fake-id-token')),
            getIdTokenResult: jest.fn(),
            reload: jest.fn(),
            toJSON: jest.fn(),
        } as User,
        providerId: 'firebase',
        operationType: 'signIn',
    });
});

// Mock for signInWithPopup
export const signInWithPopup = jest.fn((auth, provider): Promise<UserCredential> => {
    return Promise.resolve({
        user: {
            uid: '67890',
            email: 'testuser@example.com',
            displayName: 'Test User',
            emailVerified: false,
            isAnonymous: false,
            metadata: {
                creationTime: '2023-01-01T00:00:00.000Z',
                lastSignInTime: '2023-01-01T00:00:00.000Z',
            },
            phoneNumber: null,
            photoURL: null,
            providerData: [],
            providerId: 'google.com',
            refreshToken: 'fake-refresh-token',
            tenantId: null,
            delete: jest.fn(),
            getIdToken: jest.fn(() => Promise.resolve('fake-id-token')),
            getIdTokenResult: jest.fn(),
            reload: jest.fn(),
            toJSON: jest.fn(),
        } as User,
        providerId: 'google.com',
        operationType: 'signIn',
    });
});

export const GoogleAuthProvider = jest.fn(() => ({
    providerId: 'google.com',
}));

export const signOut = jest.fn(() => Promise.resolve());

export const sendPasswordResetEmail = jest.fn(() => Promise.resolve());

export const updatePassword = jest.fn((user, password) => Promise.resolve());
