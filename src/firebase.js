import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut, 
    sendEmailVerification, 
    reload } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyAMeyYJpAD6ViSsVGBsHQpggL8sWnSLYZQ",
  authDomain: "activity-tracer-3de38.firebaseapp.com",
  projectId: "activity-tracer-3de38",
  storageBucket: "activity-tracer-3de38.firebasestorage.app",
  messagingSenderId: "758444690868",
  appId: "1:758444690868:web:ae25d824e53f214693b6e1"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

//SIGN UP
const signUp = async (name, email, password) => {
    try {
        console.log("1. Creating Firebase Auth account...");

        const res = await createUserWithEmailAndPassword(
            auth, 
            email, 
            password
        );

        const user = res.user;

        console.log("2. Auth account created:", user.uid); 
        console.log("3. Sending verification email...");
        
        // Send verification email 
        await sendEmailVerification(user);

        console.log("4. Verification email sent"); 
        console.log("5. Saving user to Firestore...");

        // Save user information in Firestore
        await setDoc(doc(db, "user", user.uid), {
            uid: user.uid,
            name,
            authProvider: "local",
            email
        });

        console.log("6. User saved to Firestore"); 
        console.log("7. Signup complete!");

        //toast.success("Account created! Please check your email to verify your account.");

        // Sign the user out until they verify their email 
        //await signOut(auth);

        // Keep the user signed in temporarily. 
        // This allows us to check verification status from the verification screen. 
        return user;

    } catch (e) {
        console.log("SIGN UP ERROR:", e);

        if (e.code === "auth/email-already-in-use") { 
            toast.error("An account with this email already exists."); 
        } 
        else if (e.code === "auth/invalid-email") { 
            toast.error("Please enter a valid email address."); 
        } 
        else if (e.code === "auth/weak-password") { 
            toast.error("Password should be at least 6 characters."); 
        } 
        else if (e.code === "auth/operation-not-allowed") { 
            toast.error("Email/password sign-up is not enabled."); 
        } 
        else if (e.code === "permission-denied") { 
            toast.error("Unable to save your account information."); 
        } 
        else { 
            toast.error("Something went wrong. Please try again."); 
        }
        return null;
    }
};

// RESEND VERIFICATION EMAIL
const resendVerificationEmail = async () => {
    try {
        const user = auth.currentUser;

        if (!user) {
            toast.error("No user found.");
            return false;
        }

        // Don't send another verification email if already verified
        await reload(user);

        if (auth.currentUser.emailVerified) {
            toast.success("Your email is already verified.")
            return true;
        }

        await sendEmailVerification(user);

        toast.success("Verification email sent");

        return true;
    } catch (e) {
        console.log(e);

        if (e.code === "auth/too-many-requests") {
            toast.error("Too many request. Please wait before trying again.")
        } else {
            toast.error("Unable to send verification email.")
        }

        return false;
    }
};

//CHECK WHETHER CURRENT USER HAV VERIFIED THEIR EMAIL
const checkEmailVerified = async () => {
    try {
        const user = auth.currentUser;

        if (!user) {
            return false;
        }

        //Refresh the user's Firebase information
        await reload(user);

        return auth.currentUser.emailVerified;
    } catch (e) {
        console.log(e);
        return false;
    }
};

//LOGIN
const logIn = async (email, password) => {

    console.log("LOGIN FUNCTION STARTED");

    try {
        const res = await signInWithEmailAndPassword(
            auth, 
            email, 
            password
        );

        const user = res.user;

        console.log("FIREBASE LOGIN SUCCESS:", user);

        //Check if email has been verified
        if (!user.emailVerified) {
            toast.error("Please verify your email before signing in.");
            await signOut(auth);
            return false;
        }

        //LOGIN SUCCESSFUL
        return true;
    } catch (e) {
        console.log(e);
        
        switch (e.code) {
            case "auth/user-not-found": toast.error("No account is registered with this email."); 
            break; 
            
            case "auth/wrong-password": toast.error("Incorrect password."); 
            break; 
            
            case "auth/invalid-credential": toast.error("Incorrect email or password."); 
            break; 
            
            case "auth/invalid-email": toast.error("Please enter a valid email address."); 
            break; 
            
            case "auth/user-disabled": toast.error("This account has been disabled."); 
            break; 
            
            case "auth/too-many-requests": toast.error("Too many failed attempts. Please try again later."); 
            break; 
            
            default: toast.error("Unable to sign in. Please try again."); 
        }

        return false;
    }
};

//LOGOUT
const logOut = async () => {
    try {
        await signOut(auth);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
};

export {auth, db, signUp, logIn, logOut, resendVerificationEmail, checkEmailVerified};