import React, { useEffect, useState } from "react";
import { FcHome } from "react-icons/fc";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getAuth, updateCurrentUser, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { db } from "../firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import ListingItem from "../components/ListingItem";

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const fetchUserListing = async () => {
      const listingRef = collection(db, "listings");
      // Query for listings created by the user
      const q = query(
        listingRef,
        where(
          "userRef",
          "==",
          auth.currentUser.uid,
          orderBy("timestamp", "desc")
        )
      );
      const querySnap = await getDocs(q);
      // Store the listings in an array
      const listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    };
    fetchUserListing();
  }, [auth.currentUser.uid]);

  const onDelete = async (listingID) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      await deleteDoc(doc(db, "listings", listingID));
      const updatedListing = listings.filter(
        (listing) => listing.id !== listingID
      );
      setListings(updatedListing);
      toast.success("Successfully deleted the Listing ");
    }
  };

  const onEdit = (listingID) => {
    navigate(`/edit-listing/${listingID}`);
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
              aria-labelledby={name}
              aria-label={name}
              placeholder={name}
              title={name}
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
              aria-labelledby={email}
              aria-label={email}
              placeholder={email}
              title={email}
              disabled
            />

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
              <p className="flex items-center ">
                Do you want to change your name?
              </p>
              <span
                onClick={() => {
                  changeDetail && onSubmit();
                  setChangeDetail((prevState) => !prevState);
                }}
                className="text-red-600 hover:text-red-800 2xl:mr-42 xl:mr-40 lg:mr-24
                transition ease-in-out duration-200 mr-20 cursor-pointer"
              >
                {changeDetail ? "Apply change" : "Edit"}
              </span>
              <p
                onClick={onLogout}
                className="text-blue-600 hover:text-blue-800 2xl:ml-2 
              cursor-pointer transition ease-in-out duration-200"
              >
                Sign Out
              </p>
            </div>
          </form>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white uppercase px-7 py-3
          text-sm font-medium rounded shadow-md hover:bg-blue-700 transition ease-in-out 
          duration-150 hover:shadow-l active:bg-blue-800"
            aria-label="Create Listing"
            aria-labelledby="Create Listing"
            title="Sell or Rent Your home"
          >
            <Link
              to="/create-listing"
              className="flex justify-center items-center"
            >
              <FcHome className="mr-2 text-3xl bg-red-200 rounded-full p-1 border-2" />
              Sell or Rent your home
            </Link>
          </button>
        </div>
      </section>
      {/* Listings Section */}
      <main className="max-w-6xl px-3 mt-6 mx-auto">
        {!loading && listings.length > 0 && (
          <>
            <h2 className="text-2xl text-center font-semibold mb-6 mt-6">
              My Listings
            </h2>
            <ul className="mt-6 mb-6 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                  onDelete={() => onDelete(listing.id)}
                  onEdit={() => onEdit(listing.id)}
                />
              ))}
            </ul>
          </>
        )}
      </main>
      {/* End of Listings Section */}
    </>
  );
};

export default Profile;
