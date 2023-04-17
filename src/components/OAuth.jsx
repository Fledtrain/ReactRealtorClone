import React from "react";
import { FcGoogle } from "react-icons/fc";

const OAuth = () => {
  return (
    <>
      <button
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
