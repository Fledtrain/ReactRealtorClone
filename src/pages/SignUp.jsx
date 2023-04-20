import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase";
import { async } from "@firebase/util";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;
  const navigate = useNavigate();
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault(); // Prevents the page from reloading
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      //Comes from form data
      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const user = userCredential.user;
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);
      toast.success("Account created successfully");
      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already in use");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Invalid email");
      } else if (error.code === "auth/weak-password") {
        toast.error("Password must be at least 6 characters");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <>
      <section>
        <h1 className="text-3xl text-center mt-6 font-bold"> Sign up </h1>
        <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
          <div className="md:w-[70%] lg:w-[50%] mb-12 md:mb-6">
            <img
              src="https://images.unsplash.com/photo-1585914641050-fa9883c4e21c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80"
              alt="Key pic"
              className="w-full rounded-2xl"
            />
          </div>
          <div className="w-full md:w-[66%] lg:w-[41%] lg:ml-20">
            {/* Form Begin */}
            <form onSubmit={onSubmit}>
              <input
                type="text"
                id="name"
                value={name}
                onChange={onChange}
                placeholder="Full name"
                className=" mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white
                 border-gray-300 rounded transition ease-in-out"
              />
              <input
                type="email"
                id="email"
                value={email}
                onChange={onChange}
                placeholder="Email Address"
                className=" mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white
                 border-gray-300 rounded transition ease-in-out"
              />
              <div className="relative mb-6">
                <input
                  className="w-full px-4 py-2 text-xl text-gray-700 bg-white
                 border-gray-300 rounded transition ease-in-out"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={onChange}
                  placeholder="Password"
                />
                {showPassword ? (
                  <AiFillEyeInvisible
                    className="absolute right-3 top-3 text-xl cursor-pointer"
                    onClick={() => setShowPassword((prevState) => !prevState)}
                  />
                ) : (
                  <AiFillEye
                    className="absolute right-3 top-3 text-xl cursor-pointer"
                    onClick={() => setShowPassword((prevState) => !prevState)}
                  />
                )}
              </div>
              <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
                <p className="mb-6">
                  Have a account?
                  <Link
                    to="/sign-in"
                    className="text-red-600 hover:text-red-700 transition 
                    duration-200 ease-in-out ml-1"
                  >
                    Sign in
                  </Link>
                </p>
                <p>
                  <Link
                    to="/forgot-password"
                    className="text-blue-600 hover:text-blue-700 transition 
                    duration-200 ease-in-out ml-1"
                  >
                    Forgot Password?
                  </Link>
                </p>
              </div>
              <button
                className="w-full bg-blue-600 text-white px-7 py-3 
              rounded text-sm font-medium uppercase shadow-md hover:bg-blue-700
              transition duration-200 ease-in-out hover:shadow-lg active:bg-blue-800"
                type="submit"
              >
                Sign up
              </button>
              <div
                className="flex my-4 items-center before:border-t before:flex-1  before:border-gray-300
              after:border-t after:flex-1  after:border-gray-300"
              >
                <p className="uppercase text-center font-semibold mx-4">or</p>
              </div>
            </form>
            <OAuth />
            {/* End of Form */}
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
