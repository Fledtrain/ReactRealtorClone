import React, { useState } from "react";
import { getAuth, updateCurrentUser, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;
  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...formData,
      [e.target.id]: e.target.value,
    }));
  };
  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // Update the user's display name in firebase auth
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        // Update the name in firestore
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        });
      }
      toast.success("Profile name changed successfully");
    } catch (error) {
      toast.error("Could not save changes");
      console.log(error.message);
    }
  };

  return (
    <>
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
        <div className="w-full md:w-[50%] mt-6 px-3">
          <form>
            {/* Name Input */}
            <input
              className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 
              rounded transition ease-in-out ${
                changeDetail && "bg-red-200 focus:bg-red-200"
              }`}
              type="text"
              id="name"
              value={name}
              disabled={!changeDetail}
              onChange={onChange}
            />
            {/* Email Input */}
            <input
              className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 
              rounded transition ease-in-out "
              type="email"
              id="email"
              value={email}
              disabled
            />

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
              <p className="flex items-center">
                Do you want to change your name?
              </p>
              <span
                onClick={() => {
                  changeDetail && onSubmit();
                  setChangeDetail((prevState) => !prevState);
                }}
                className="text-red-600 hover:text-red-800 
                transition ease-in-out duration-200 mr-20 cursor-pointer"
              >
                {changeDetail ? "Apply change" : "Edit"}
              </span>
              <p
                onClick={onLogout}
                className="text-blue-600 hover:text-blue-800 
              cursor-pointer transition ease-in-out duration-200"
              >
                Sign Out
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Profile;
