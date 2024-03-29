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
import { getAuth } from "firebase/auth";
import Contact from "../components/Contact";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const Listing = () => {
  const auth = getAuth();
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [contactLandlord, setContactLandlord] = useState(false);
  // For Showing shared button copied to clipboard
  const [shareLinkCopied, setShareLinkedCopied] = useState(false);

  // Swiper
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
        pagination={{ type: "bullets" }}
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
        <div className=" w-full">
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
          {/* Description of Listing/Parking/Bath/Bed/Furnished &*/}
          <p className="mt-3 mb-6">
            <span className="font-semibold">Description</span> -{" "}
            {listing.description}
          </p>
          <ul
            className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 lg:space-x-8 
          text-sm font-semibold mb-2 sm:mb-6">
            <li className="flex items-center space-x-1 mb-2 whitespace-nowrap">
              <FaBed className="text-lg mr-2" />
              {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
            </li>
            <li className="flex items-center space-x-1 mb-2 whitespace-nowrap">
              <FaBath className="text-lg mr-2" />
              {listing.baths > 1 ? `${listing.baths} Baths` : "1 Bath"}
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
          {/* End of Description of Listing/Parking/Bath/Bed/Furnished */}
          {listing.userRef !== auth.currentUser?.uid && !contactLandlord && (
            <div className="mt-6">
              <button
                onClick={() => setContactLandlord(true)}
                className="px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded 
                shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-800 focus:shadow-lg 
                w-full text-center transition duration-150 ease-in-out "
              >
                Contact Landlord
              </button>
            </div>
          )}
          {contactLandlord && (
            <>
              <Contact userRef={listing.userRef} listing={listing} />
            </>
          )}
        </div>
        {/* Map Section  */}
        <div
          className="w-full h-[200px] md:h-[400px] z-10 overflow-x-hidden mt-6
        lg:mt-0 md:ml-4"
        >
          <MapContainer
            center={[listing.geolocation.lat, listing.geolocation.lng]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%", zIndex: "10" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[listing.geolocation.lat, listing.geolocation.lng]}
            >
              <Popup>
                {listing.address} <br />
              </Popup>
            </Marker>
          </MapContainer>
        </div>
        {/* End of Map Section */}
      </section>
    </main>
  );
};

export default Listing;
