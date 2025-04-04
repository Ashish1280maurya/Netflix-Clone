// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { signInWithEmailAndPassword,createUserWithEmailAndPassword,getAuth,signOut} from "firebase/auth";
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKVEY190ODTtlsIUmILgZmcMiqTr_XO2A",
  authDomain: "netflix-clone-53a8a.firebaseapp.com",
  projectId: "netflix-clone-53a8a",
  storageBucket: "netflix-clone-53a8a.firebasestorage.app",
  messagingSenderId: "607885056555",
  appId: "1:607885056555:web:a02d5880bc23681dc7686e",
  measurementId: "G-30NFXSEYHB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user
        await addDoc(collection(db,"user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    }catch(error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async(email, password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }

}

const logout = ()=>{
    signOut(auth);
}

export {auth, db , login , signup, logout}