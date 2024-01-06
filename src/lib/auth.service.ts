/* eslint-disable @typescript-eslint/no-explicit-any */
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, type User as FirebaseAuthUser } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { goto } from '$app/navigation';
import { authUser, type AuthUser } from './authStore';
import { firebaseAuth, firestore } from './firebase/firebase.app';

const getUserDataFromFirestore = async (uid: string): Promise<AuthUser> => {
    const userRef = doc(firestore, 'users', uid);
    const userDoc = await getDoc(userRef);

    const userData = userDoc.exists() ? userDoc.data() : {};

    return {
        uid: uid,
        email: userData.email || '',
        first_name: userData.first_name || '',
        last_name: userData.last_name || '',
    };
};

const createUserInFirestore = async (user: FirebaseAuthUser, additionalInfo: AuthUser) => {
    const createdUser = {
        first_name: additionalInfo.first_name,
        last_name: additionalInfo.last_name,
        email: additionalInfo.email,
    };

    const userRef = doc(firestore, 'users', user.uid);
    await setDoc(userRef, createdUser);

    return { ...createdUser, uid: user.uid };
};

const handleAuthError = (error: any, action: string) => {
    return `Erreur lors de ${action} : ${error?.message}`;
};

export const register = async (email: string, password: string, additionalInfo: AuthUser) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
        const user = userCredential.user;

        if (user) {
            const createdUser = await createUserInFirestore(user, additionalInfo);
            authUser.set(createdUser);
            goto('/');
        }
    } catch (error: any) {
        return handleAuthError(error, 'l\'enregistrement de l\'utilisateur');
    }
};

export const login = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
        const user = userCredential.user;

        if (user) {
            const userData = await getUserDataFromFirestore(user.uid);

            if (userData) {
                authUser.set(userData);
                goto('/');
            } else {
                console.error('Utilisateur non trouvé dans Firestore');
            }
        }
    } catch (error: any) {
        return handleAuthError(error, 'la connexion de l\'utilisateur');
    }
};

export const loginWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(firebaseAuth, provider);
        const user = userCredential.user;

        if (user) {
            const userData = await getUserDataFromFirestore(user.uid);

            if (userData) {
                authUser.set(userData);
                goto('/');
            } else {
                const createdUser = await createUserInFirestore(user, {
                    first_name: user.displayName?.split(' ')[0] || '',
                    last_name: user.displayName?.split(' ')[1] || '',
                    email: user.email || '',
                    uid: user.uid
                });

                authUser.set(createdUser);
                goto('/');
            }
        }
    } catch (error: any) {
        return handleAuthError(error, 'l\'inscription de l\'utilisateur avec Google');
    }
};

