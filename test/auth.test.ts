import { doCreateUserWithEmailAndPassword, doSignInWithEmailAndPassword, doPasswordReset, doSignInWithGoogle, doSignOut, doPasswordChange, doSendEmailVerification } from "../src/firebase/auth"; // Adjust path to your actual file
import { GoogleAuthProvider, User, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, sendPasswordResetEmail, updatePassword, sendEmailVerification } from 'firebase/auth';
import { auth } from "../src/firebase/firebase";

// Tell Jest to use the mock Firebase functions we created in __mocks__
jest.mock('firebase/auth');

describe('doSignInWithEmailAndPassword', () => {
    const mockEmail = 'testuser@example.com';
    const mockPassword = 'securePassword';
  
    it('should return User on successful sign-in', async () => {
      // Use Partial<User> to allow a simpler object structure in tests
      const mockUser: Partial<User> = {
        uid: '67890',
        email: mockEmail,
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
        providerId: 'firebase',
        refreshToken: 'fake-refresh-token',
        tenantId: null,
      };
  
      // Use Partial<UserCredential> and type assertion to match UserCredential
      const mockUserCredential: Partial<UserCredential> = {
        user: mockUser as User,  // Cast to User
        providerId: 'firebase',
        operationType: 'signIn',
      };
  
      // Mock the resolved value of signInWithEmailAndPassword without generics
      (signInWithEmailAndPassword as jest.MockedFunction<typeof signInWithEmailAndPassword>).mockResolvedValue(mockUserCredential as UserCredential);
  
      // Act: Call the function with mock data
      const result = await doSignInWithEmailAndPassword(mockEmail, mockPassword);
  
      // Assert: Verify the function behaves as expected
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), mockEmail, mockPassword);
      expect(result).toEqual(mockUserCredential.user);
    });
  
    it('should throw an error on failed sign-in', async () => {
      // Define a mock error
      const mockError = new Error('Error during sign-in');
      (signInWithEmailAndPassword as jest.MockedFunction<typeof signInWithEmailAndPassword>).mockRejectedValue(mockError);
  
      // Assert: Verify that the function throws an error
      await expect(doSignInWithEmailAndPassword(mockEmail, mockPassword)).rejects.toThrow('Error during sign-in');
    });
});


describe('doCreateUserWithEmailAndPassword', () => {
  const mockEmail = 'test@example.com';
  const mockPassword = 'password123';

  it('should return UserCredential on successful user creation', async () => {
    // Arrange: Simulate a successful user creation
    const mockUserCredential = {
      user: {
        uid: '12345',
        email: mockEmail,
      }
    };

    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue(mockUserCredential);

    // Act: Call the function
    const result = await doCreateUserWithEmailAndPassword(mockEmail, mockPassword);

    // Assert: Check if the function returns the expected result
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), mockEmail, mockPassword);
    expect(result).toEqual(mockUserCredential);
  });

  it('should throw an error on failure', async () => {
    // Arrange: Simulate a failure
    const mockError = new Error('Error creating user');
    (createUserWithEmailAndPassword as jest.Mock).mockRejectedValue(mockError);

    // Act & Assert: Ensure that the function throws the correct error
    await expect(doCreateUserWithEmailAndPassword(mockEmail, mockPassword)).rejects.toThrow('Error creating user');
  });
});

describe('doSignInWithGoogle', () => {
    it('should throw an error on failed Google sign-in', async () => {
        const mockError = new Error('Error signing in with Google');
        (signInWithPopup as jest.MockedFunction<typeof signInWithPopup>).mockRejectedValue(mockError);

        await expect(doSignInWithGoogle()).rejects.toThrow('Error signing in with Google');
    });
});

describe('doSignOut', () => {
    it('should sign out the user successfully', async () => {
        // Mock a successful sign-out
        (signOut as jest.MockedFunction<typeof signOut>).mockResolvedValue();

        // Act: Call the function
        await doSignOut();

        // Assert: Check if signOut was called once
        expect(signOut).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if sign-out fails', async () => {
        // Arrange: Simulate an error during sign-out
        const mockError = new Error('Error signing out');
        (signOut as jest.MockedFunction<typeof signOut>).mockRejectedValue(mockError);

        // Act & Assert: Verify that doSignOut throws the error
        await expect(doSignOut()).rejects.toThrow('Error signing out');
    });
});

describe('doPasswordReset', () => {
    const mockEmail = 'testuser@example.com';

    it('should send a password reset email successfully', async () => {
        // Mock a successful password reset email send
        (sendPasswordResetEmail as jest.MockedFunction<typeof sendPasswordResetEmail>).mockResolvedValue();

        // Act: Call the function
        await doPasswordReset(mockEmail);

        // Assert: Verify that sendPasswordResetEmail was called with the correct email
        expect(sendPasswordResetEmail).toHaveBeenCalledWith(expect.anything(), mockEmail);
        expect(sendPasswordResetEmail).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if sending the password reset email fails', async () => {
        // Arrange: Simulate an error during password reset email send
        const mockError = new Error('Error sending password reset email');
        (sendPasswordResetEmail as jest.MockedFunction<typeof sendPasswordResetEmail>).mockRejectedValue(mockError);

        // Act & Assert: Verify that doPasswordReset throws the error
        await expect(doPasswordReset(mockEmail)).rejects.toThrow('Error sending password reset email');
    });
});

describe('doPasswordChange', () => {
    const mockPassword = 'newSecurePassword';

    it('should successfully update the password if a user is signed in', async () => {
        // Set up `auth.currentUser` with a mock user for this test
        (auth as any).currentUser = { uid: 'user123', email: 'testuser@example.com' };

        // Mock `updatePassword` to resolve successfully
        (updatePassword as jest.MockedFunction<typeof updatePassword>).mockResolvedValueOnce(undefined);

        // Act: Call the function
        await doPasswordChange(mockPassword);

        // Assert: Verify `updatePassword` was called with the correct user and password
        expect(updatePassword).toHaveBeenCalledWith(auth.currentUser, mockPassword);
        expect(updatePassword).toHaveBeenCalledTimes(1);

        // Clean up: Reset `auth.currentUser` after test
        (auth as any).currentUser = null;
    });

    it('should throw an error if updating the password fails', async () => {
        // Set up `auth.currentUser` with a mock user
        (auth as any).currentUser = { uid: 'user123', email: 'testuser@example.com' };

        // Mock `updatePassword` to reject with an error
        const mockError = new Error('Error updating password');
        (updatePassword as jest.MockedFunction<typeof updatePassword>).mockRejectedValueOnce(mockError);

        // Act & Assert: Verify `doPasswordChange` throws the error
        await expect(doPasswordChange(mockPassword)).rejects.toThrow('Error updating password');

        // Clean up: Reset `auth.currentUser` after test
        (auth as any).currentUser = null;
    });

    it('should throw an error if no user is currently signed in', async () => {
        // Ensure `auth.currentUser` is null for this test
        (auth as any).currentUser = null;

        // Act & Assert: Verify `doPasswordChange` throws the correct error
        await expect(doPasswordChange(mockPassword)).rejects.toThrow('No user is currently signed in');
    });
});

