import { React, useContext, useState, useEffect, createContext } from "react";
import auth from "../firebase";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    updateEmail,
    updatePassword,
  } from "firebase/auth";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    // signup
    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // logout
    const logout = () => {
        return signOut(auth);
    }

    // login
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    //  send email and allow to change password
    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    // update email
    const updateUserEmail = (email) => {
        return updateEmail(auth.currentUser, email);
      };

    // update password
    const updateUserPassword = (password) => {
        return updatePassword(auth.currentUser, password);
      };

    // changeUser
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        // clean up of callback function of useEffect

        return () => {
            unsubscribe();
        };
    }, []);
    return (
        <AuthContext.Provider
            value={{
                currentUser,
                signup,
                logout,
                login,
                resetPassword,
                updateUserEmail,
                updateUserPassword
            }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
export default AuthProvider;
