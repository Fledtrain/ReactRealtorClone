import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { MdLocationOn } from "react-icons/md";

const ListingItem = ({ listing, id }) => {
  return (
    <>
      <li
        className="relative bg-white flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md
      overflow-hidden transition-shadow duration-150 ease-in-out m-3"
      >
        <Link to={`/category/${listing.type}/${id}`}>
          <img
            className="h-[170px] w-full object-cover hover:scale-125 transition ease-in-out duration-250"
            loading="lazy"
            src={listing.imgUrls[0]}
          />
          <Moment
            className="absolute top-2 left-2 bg-[#2563eb] text-white uppercase text-xs font-semibold
            rounded-md px-2 py-1 shadow-lg"
            fromNow
          >
            {listing.timestamp?.toDate()}
          </Moment>
          {/* Listing/Bed/Bath Section */}
          <div className="w-full p-[10px] ">
            <div className=" flex items-center space-x-1">
              <MdLocationOn className="h-4 w-4 text-[#2563eb]" />
              <p className="font-semibold text-sm mb-[2px] text-gray-600 truncate">
                {listing.address}
              </p>
            </div>
            <p className="font-semibold mt-2 text-xl truncate">
              {listing.name}
            </p>
            <p className="text-[#457b9d] mt-2 font-semibold">
              $
              {listing.offer
                ? listing.discountedPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : listing.regularPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              {listing.type === "rent" && " / month"}
            </p>
            <div className="flex items-center mt-3 space-x-3">
              <div className=" flex items-center space-x-2">
                <p className="font-bold text-xs">
                  {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
                </p>
                <div>
                <p className="font-bold text-xs">
                    {listing.baths > 1 ? `${listing.baths} Baths` : "1 Bath"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* End of Listing/Bed/Bath Section */}
        </Link>
      </li>
    </>
  );
};

export default ListingItem;
