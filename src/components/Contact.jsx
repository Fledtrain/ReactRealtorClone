import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";

const Contact = ({ listing, userRef }) => {
  const [landLord, setLandLord] = useState(null);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const getLandlord = async () => {
      const docRef = doc(db, "users", userRef);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLandLord(docSnap.data());
      } else {
        toast.error("Could not get the Landlord data");
      }
    };
    getLandlord();
  }, [userRef]);
  const onChange = (event) => {
    setMessage(event.target.value);
  };
  return (
    <>
      {landLord !== null && (
        <aside className="flex flex-col w-full">
          <p className="mt-6 ">
            Contact {landLord.name} for the {listing.name.toLowerCase()}
          </p>
          <div className="mt-3 mb-6">
            <textarea
              name="message"
              id="message"
              value={message}
              onChange={onChange}
              placeholder=""
              cols="30"
              rows="10"
              className="w-full text-xl h-32 mt-2 px-4 py-2 bg-white text-gray-700 
              border border-gray-300 rounded transition ease-in-out duration-150
              focus:bg-white focus:border-slate-600"
            ></textarea>
          </div>
          <a
            href={`mailto:${landLord.email}?Subject=${listing.name}&body=${message}`}
          >
            <button
              className="px-7 py-3 bg-blue-600 text-white rounded text-sm uppercase shadow-md hover:bg-blue-700
              hover:shadow-lg transition ease-in-out duration-150 focus:bg-blue-800 active:bg-blue-950 w-full text-center mb-6"
              type="button"
            >
              Send Message
            </button>
          </a>
        </aside>
      )}
    </>
  );
};

export default Contact;
