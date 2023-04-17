import React, { useState } from "react";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <section>
        <h1 className="text-3xl text-center mt-6 font-bold">Forgot Password</h1>
        <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
          <div className="md:w-[67%] lg-w-[50%] mb-12 md:mb-6">
            <img
              src="https://images.unsplash.com/photo-1585914641050-fa9883c4e21c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80"
              alt="Key pic"
              className="w-full rounded-2xl"
            />
          </div>
          <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
            {/* Form Begin */}
            <form>
              <input
                type="email"
                id="email"
                value={email}
                onChange={onChange}
                placeholder="EmailAddress@email.com"
                className=" mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white
                 border-gray-300 rounded transition ease-in-out"
              />

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
                    to="/sign-in"
                    className="text-blue-600 hover:text-blue-700 transition 
                    duration-200 ease-in-out ml-1"
                  >
                    Sign in Instead
                  </Link>
                </p>
              </div>
              <button
                className="w-full bg-blue-600 text-white px-7 py-3 
              rounded text-sm font-medium uppercase shadow-md hover:bg-blue-700
              transition duration-200 ease-in-out hover:shadow-lg active:bg-blue-800"
                type="submit"
              >
                send reset password
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

export default ForgotPassword;
