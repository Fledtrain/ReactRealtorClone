import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";
import { useParams } from "react-router-dom";

const Category = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchedListing] = useState(null);
  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingRef = collection(db, "listings");
        const q = query(
          listingRef,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        const querySnap = await getDocs(q);
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchedListing(lastVisible);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListing(listings);
        setLoading(false);
      } catch (error) {
        toast.error("Could not fetch listings");
      }
    };
    fetchListings();
  }, [params.categoryName]);

  const onFetchMoreListings = async () => {
    try {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("type", "==", params.categoryName),
        orderBy("timestamp", "desc"),
        // Start after the last visible listing
        startAfter(lastFetchedListing),
        limit(4)
      );
      const querySnap = await getDocs(q);
      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchedListing(lastVisible);
      const listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListing((prevState) => [...prevState, ...listings]);
      setLoading(false);
    } catch (error) {
      toast.error("Could not fetch listings");
    }
  };
  return (
    <>
      <section className="max-w-6xl mx-auto px-3">
        <h1 className="text-3xl text-center mt-6 font-bold mb-6">
          Places for {params.categoryName}
          {/* {/* Or I can write it like this too: */}
          {/* {params.categoryName ==="rent" ? "places for rent" : "places for sale"}*/}
        </h1>
        {loading ? (
          <Spinner />
        ) : listing && listing.length > 0 ? (
          <>
            <main>
              <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {listing.map((listing) => (
                  <ListingItem
                    key={listing.id}
                    id={listing.id}
                    listing={listing.data}
                  />
                ))}
              </ul>
            </main>
            {lastFetchedListing && (
              <div className="flex justify-center items-center">
                <button
                  onClick={onFetchMoreListings}
                  className="bg-white text-l text-gray-700 py-1.5 px-3 border border-gray-300 mb-6 mt-6
                  hover:border-slate-600 transition rounded ease-in-out duration-150"
                >
                  Load more
                </button>
              </div>
            )}
          </>
        ) : (
          <p>There are no current places for {params.categoryName}</p>
          //   Or I can write it like this too:
          //  <p>There are no current {params.categoryName ==="rent" ? "places for rent" : "places for sale"}</p>
        )}
      </section>
    </>
  );
};

export default Category;
