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
import { FiShare } from "react-icons/fi";
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
          }, 3000);
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
    </main>
  );
};

export default Listing;
