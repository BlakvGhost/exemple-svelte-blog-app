import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { type AuthUser, authUser } from "./authStore";
import { firebaseAuth, firestore } from "./firebase/firebase.app";
import { goto } from "$app/navigation";
import { doc, setDoc } from "firebase/firestore";

export const register = async (email: string, password: string, additionalInfo: AuthUser) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
        const user = userCredential.user;

        if (user) {
            const createdUser = {
                first_name: additionalInfo.first_name,
                last_name: additionalInfo.last_name,
                email: additionalInfo.email,
            };

            const userRef = doc(firestore, 'users', user.uid);
            await setDoc(userRef, createdUser);

            authUser.set({ ...createdUser, ...{ uid: user.uid } })

            goto('/');
        }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('Erreur lors de l\'enregistrement de l\'utilisateur:', error?.message);
    }
};


export const login = async (email: string, password: string) => {
    signInWithEmailAndPassword(firebaseAuth, email, password)
        .then(() => {
            goto('/');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
};
