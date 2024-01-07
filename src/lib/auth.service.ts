/* eslint-disable @typescript-eslint/no-explicit-any */
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, type User as FirebaseAuthUser, signOut, browserLocalPersistence, setPersistence } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { goto } from '$app/navigation';
import { authUser, AuthUser as User } from './authStore';
import { firebaseAuth, firestore } from './firebase/firebase.app';


const getUserDataFromFirestore = async (uid: string): Promise<User> => {
    const userRef = doc(firestore, 'users', uid);
    const userDoc = await getDoc(userRef);

    const userData = userDoc.exists() ? userDoc.data() : {};

    return new User(
        uid,
        userData?.email || '',
        userData?.first_name || '',
        userData?.last_name || '',
        userData?.avatar || ''
    )
};

const createUserInFirestore = async (user: FirebaseAuthUser, additionalInfo: User) => {
    const createdUser = new User(
        additionalInfo.first_name,
        additionalInfo.last_name,
        additionalInfo.email,
        additionalInfo.avatar,
    );

    const userRef = doc(firestore, 'users', user.uid);
    await setDoc(userRef, createdUser);

    return { ...createdUser, uid: user.uid };
};

const handleAuthError = (error: any, action: string) => {
    return `Erreur lors de ${action} : ${error?.message}`;
};

export const register = async (email: string, password: string, additionalInfo: User) => {
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
        await setPersistence(firebaseAuth, browserLocalPersistence);
        const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
        const user = userCredential.user;

        if (user) {
            const userData = await getUserDataFromFirestore(user.uid);

            authUser.set(userData);
            goto('/');
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

            if (userData.email && userData.first_name) {
                authUser.set(userData);
                goto('/');
            } else {
                const createdUser = await createUserInFirestore(user, new User(
                    user.displayName?.split(' ')[0] || '',
                    user.displayName?.split(' ')[1] || '',
                    user.email || '',
                    user.uid,
                    user.photoURL || '',
                ));

                authUser.set(createdUser);
                goto('/');
            }
        }
    } catch (error: any) {
        return handleAuthError(error, 'l\'inscription de l\'utilisateur avec Google');
    }
};

export const logout = async () => {
    signOut(firebaseAuth).then(() => {
        authUser.set(null);
        goto('/auth/login');
    })
        .catch((error) => {
            console.error('Erreur lors de la déconnexion de l\'utilisateur:', error?.message);
        })
};

export { getUserDataFromFirestore }