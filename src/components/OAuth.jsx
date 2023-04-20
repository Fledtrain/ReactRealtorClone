import React from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { Navigate, useNavigate } from "react-router-dom";

const OAuth = () => {
  const navigate = useNavigate();
  const onGoogleClick = async () => {
    try {
      // Sign in with Google
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check for user
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef); //Checks to see if the user exists in the database

      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
        toast.success("Account created successfully");
        navigate("/");
      } else if (docSnap.exists()) {
        toast.success("Signed in successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error("Could not authroize with Google");
      console.log(error.message);
    }
  };
  return (
    <>
      <button
        typeof="button"
        onClick={onGoogleClick}
        className="uppercase rounded flex items-center justify-center w-full bg-red-800
       text-white text-sm font-medium px-7 py-3 hover:bg-red-900 
       active:bg-red-1000 shadow-md hover:shadow=lg active:shadow-lg duration-200 ease-in-out "
      >
        <FcGoogle className="text-2xl bg-white rounded-full mr-2" />
        Continue with Google
      </button>
    </>
  );
};

export default OAuth;
