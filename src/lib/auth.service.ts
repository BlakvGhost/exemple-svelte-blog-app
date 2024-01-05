import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { AuthUser } from "./authSore";
import { firebaseAuth } from "./firebase/firebase.app";
import { goto } from "$app/navigation";

export const register = async (email: string, password: string, additionalInfo: AuthUser) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
        const user = userCredential.user;

        if (user) {
            await firestore.collection('users').doc(user.uid).set({
                first_name: additionalInfo.first_name,
                last_name: additionalInfo.last_name,
                email: additionalInfo.email,
            });

            goto('/');
        }
    } catch (error) {
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
