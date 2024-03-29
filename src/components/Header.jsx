import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Header = () => {
  // Check the status of the user
  const [pageState, setPageState] = useState("Sign in");
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState("Profile");
      } else {
        setPageState("Sign in");
      }
    });
  }, [auth]);

  const location = useLocation();
  const navigate = useNavigate();
  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };
  return (
    <>
      <main className="bg-white border-b shadow-sm sticky top-0 z-40">
        <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
          <div>
            <img
              src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
              alt="Realtor Logo"
              className="h-5 cursor-pointer"
              onClick={() => navigate("/")}
              aria-label="Navigate to home page"
            />
          </div>
          <div>
            <ul className="flex space-x-10 ">
              <li
                className={`cursor-pointer py-3 text-sm font-semibold text-gray-600 border-b-[3px] border-b-transparent 
                ${pathMatchRoute("/") && "text-black border-b-red-500"}`}
                onClick={() => navigate("/")}
              >
                Home
              </li>
              <li
                className={`cursor-pointer py-3 text-sm font-semibold text-gray-600 border-b-[3px] border-b-transparent 
                ${pathMatchRoute("/about") && "text-black border-b-red-500"} hidden md:block`}
                onClick={() => navigate("/about")}
              >
                About
              </li>
              <li
                className={`cursor-pointer py-3 text-sm font-semibold text-gray-600 border-b-[3px] border-b-transparent 
                ${pathMatchRoute("/offers") && "text-black border-b-red-500"}`}
                onClick={() => navigate("/offers")}
              >
                Offers
              </li>
              <li
                className={`cursor-pointer py-3 text-sm font-semibold text-gray-600 border-b-[3px] border-b-transparent 
                ${(pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) &&
                  "text-black border-b-red-500"
                  }`}
                onClick={() => navigate("/profile")}
              >
                {pageState}
              </li>
            </ul>
          </div>
        </header>
      </main>
    </>
  );
};

export default Header;
