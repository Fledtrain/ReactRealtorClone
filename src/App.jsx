import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <h1 className="text-4xl bg-red-500 ">Hello World</h1>
      <p className="text-3l">Hi</p>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
