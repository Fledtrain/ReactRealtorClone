import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <>
      <section>
        <h1 className="text-3xl text-center mt-6 font-bold"> Sign in </h1>
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
            <form>
              <input
                className=" mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white
                 border-gray-300 rounded transition ease-in-out"
                type="email"
                id="email"
                value={email}
                onChange={onChange}
                placeholder="Email Address"
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
                  Don't have a account?
                  <Link
                    to="/sign-up"
                    className="text-red-600 hover:text-red-700 transition 
                    duration-200 ease-in-out ml-1"
                  >
                    Register
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
                Sign in
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

export default SignIn;
