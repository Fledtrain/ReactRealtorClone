import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import Spinner from "../components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";
import { FiShare, FiMapPin } from "react-icons/fi";
import { FaBath, FaBed, FaChair, FaParking } from "react-icons/fa";
import { toast } from "react-toastify";

const Listing = () => {
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  // For Showing shared button copied to clipboard
  const [shareLinkCopied, setShareLinkedCopied] = useState(false);

  SwiperCore.use([Autoplay, Navigation, Pagination]);
  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);
  if (loading) {
    return <Spinner />;
  }
  return (
    <main>
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: "progressbar" }}
        effect="fade"
        modules={[EffectFade]}
        autoplay={{ delay: 3000 }}
      >
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full overflow-hidden h-[300px]"
              style={{
                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className="fixed top-[13%] right-[3%] z-10 bg-white cursor-pointer border-2 border-gray-400 rounded-full w-11 h-11 flex
      justify-center items-center"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          // setShareLinkedCopied(true);
          // setTimeout(() => {
          //   setShareLinkedCopied(false);
          // }, 3000);

          toast.success("Copied to clipboard");
          // Set the toast to close after 3 seconds
          setTimeout(() => {
            toast.dismiss();
          }, 2000);
        }}
      >
        <FiShare className="text-xl text-slate-500" />
      </div>
      {/* setShareLinkedCopied if i want to use it */}
      {/* {shareLinkCopied && (
        <p
          className="fixed top-[19%] right-[5%] z-10 font-semibold
        border-2 border-gray-400 rounded-md bg-white p-2"
        >
          Link Copied
        </p>
      )} */}
      <section className="m-4 flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4 rounded-lg shadow-lg bg-white lg:space-x-5">
        <div className=" w-full h-[200px] lg-[400px] ">
          <p className="text-2xl font-bold mb-3 text-blue-900">
            {listing.name} - $
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" ? " /month" : ""}
          </p>
          <p className="flex items-center mt-6 mb-3 font-semibold">
            <FiMapPin className="text-green-700 mr-1" />
            {listing.address}
          </p>
          <div className="flex flex-row justify-start items-center space-x-5 w-[75%]">
            <p
              className="bg-red-800 w-full max-w-[200px] rounded p-1 text-white text-center 
            font-semibold shadow-md"
            >
              {listing.type === "rent" ? "Rent" : "Sale"}
            </p>
            {listing.offer && (
              <p
                className="bg-green-800 w-full max-w-[200px] rounded p-1 text-white text-center 
              font-semibold shadow-md"
              >
                ${+listing.regularPrice - +listing.discountedPrice} discount
              </p>
            )}
          </div>
          <p className="mt-3 mb-3">
            <span className="font-semibold">Description</span> -{" "}
            {listing.description}
          </p>
          <ul className="flex flex-row items-center space-x-2 sm:space-x-10 text-sm font-semibold">
            <li className="flex items-center space-x-1 mb-2 whitespace-nowrap">
              <FaBed className="text-lg mr-2" />
              {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
            </li>
            <li className="flex items-center space-x-1 mb-2 whitespace-nowrap">
              <FaBath className="text-lg mr-2" />
              {listing.bathrooms > 1 ? `${listing.bedrooms} Baths` : "1 Bath"}
            </li>
            <li className="flex items-center space-x-1 mb-2 whitespace-nowrap">
              <FaParking className="text-lg mr-2" />
              {listing.parking === true ? `Parking spot` : `No parking Spot`}
            </li>
            <li className="flex items-center space-x-1 mb-2 whitespace-nowrap">
              <FaChair className="text-lg mr-2" />
              {listing.parking === true ? `Furnished` : `Not Furnished`}
            </li>
          </ul>
        </div>
        <div className="bg-blue-300 w-full h-[200px] lg-[400px] z-10 overflow-x-hidden"></div>
      </section>
    </main>
  );
};

export default Listing;
