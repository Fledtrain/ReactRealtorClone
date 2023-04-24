import React, { useState } from "react";

const CreateListing = () => {
  const [formData, setFormData] = useState({
    type: "sale",
    name: "",
    address: "",
    description: "",
    regularPrice: 0,
    discountedPrice: 0,
    bedrooms: 1,
    baths: 1,
    parking: false,
    furnished: false,
    offer: true,
  });
  const {
    type,
    name,
    bedrooms,
    baths,
    parking,
    furnished,
    address,
    description,
    offer,
    regularPrice,
    discountedPrice,
  } = FormData;
  const onChange = () => {};
  return (
    <>
      <main className="max-w-md px-2 mx-auto">
        <h1 className="text-3xl text-center mt-6 font-bold">
          Create a Listing
        </h1>
        <form>
          {/* Sell or Rent Section */}
          <p className="text-lg mt-6 font-semibold">Sell / Rent</p>
          <div className="flex ">
            <button
              type="button"
              id="type"
              value="sale"
              onClick={onChange}
              className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg 
              focus:shadow-lg active:shadow-lg transition ease-in-out duration-150 w-full ${
                type === "rent"
                  ? "bg-slate-600 text-white"
                  : "bg-white text-black"
              }`}
            >
              sell
            </button>
            <button
              type="button"
              id="type"
              value="rent"
              onClick={onChange}
              className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg 
              focus:shadow-lg active:shadow-lg transition ease-in-out duration-150 w-full ${
                type === "sale"
                  ? "bg-white text-black"
                  : "bg-slate-600 text-white"
              }`}
            >
              rent
            </button>
          </div>
          {/* End of Sell or Rent Section */}

          {/* Property Name Section */}
          <p className="text-lg mt-6 font-semibold">Name</p>
          <input
            type="text"
            id="name"
            value={name}
            onChange={onChange}
            placeholder="Property name"
            maxLength="32"
            minLength="10"
            required
            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border 
            border-gray-300 rounded transition ease-in-out  duration-150 focus:text-gray-900 
            focus:bg-white focus:border-slate-600 mb-6"
          />
          {/* End of Property Name Section */}

          {/* Beds and Baths Section  */}
          <div className="flex space-x-6 mb-6">
            <div>
              <p className="text-lg font-semibold">Beds</p>
              <input
                type="number"
                id="bedrooms"
                value={bedrooms}
                onChange={onChange}
                min="1"
                max="50"
                required
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 
                ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
              />
            </div>
            <div>
              <p className="text-lg font-semibold">Baths</p>
              <input
                type="number"
                id="baths"
                value={baths}
                onChange={onChange}
                min="1"
                max="50"
                required
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 
                ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
              />
            </div>
          </div>
          {/* End of Beds and Bath section */}

          {/* Parking Spot Section */}
          <p className="text-lg mt-6 font-semibold">Parking Spot</p>
          <div className="flex ">
            <button
              type="button"
              id="parking"
              value={true}
              onClick={onChange}
              className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg 
              focus:shadow-lg active:shadow-lg transition ease-in-out duration-150 w-full ${
                !parking === "true"
                  ? "bg-slate-600 text-white"
                  : "bg-white text-black"
              }`}
            >
              yes
            </button>
            <button
              type="button"
              id="parking"
              value={true}
              onClick={onChange}
              className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg 
              focus:shadow-lg active:shadow-lg transition ease-in-out duration-150 w-full ${
                parking === "true"
                  ? "bg-white text-black"
                  : "bg-slate-600 text-white"
              }`}
            >
              no
            </button>
          </div>
          {/* End of Parking Spot Section */}

          {/* Furnished Section */}
          <p className="text-lg mt-6 font-semibold">Furnished</p>
          <div className="flex ">
            <button
              type="button"
              id="furnished"
              value={true}
              onClick={onChange}
              className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg 
              focus:shadow-lg active:shadow-lg transition ease-in-out duration-150 w-full ${
                !furnished === "true"
                  ? "bg-slate-600 text-white"
                  : "bg-white text-black"
              }`}
            >
              yes
            </button>
            <button
              type="button"
              id="furnished"
              value={true}
              onClick={onChange}
              className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg 
              focus:shadow-lg active:shadow-lg transition ease-in-out duration-150 w-full ${
                furnished === "true"
                  ? "bg-white text-black"
                  : "bg-slate-600 text-white"
              }`}
            >
              no
            </button>
          </div>
          {/* End of Furnished Section */}

          {/* Address Section */}
          <p className="text-lg mt-6 font-semibold">Address</p>
          <textarea
            type="text"
            id="address"
            value={address}
            onChange={onChange}
            placeholder="Address"
            required
            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border 
            border-gray-300 rounded transition ease-in-out  duration-150 focus:text-gray-900 
            focus:bg-white focus:border-slate-600 mb-6"
          />
          {/* End of Address Section */}
          {/* Description Section */}
          <p className="text-lg font-semibold">Description</p>
          <textarea
            type="text"
            id="description"
            value={description}
            onChange={onChange}
            placeholder="Description of Property "
            required
            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border 
            border-gray-300 rounded transition ease-in-out  duration-150 focus:text-gray-900 
            focus:bg-white focus:border-slate-600 mb-6"
          />
          {/* End of Description Section */}

          {/* Furnished Section */}
          <p className="text-lg font-semibold">Offer</p>
          <div className="flex mb-6">
            <button
              type="button"
              id="offer"
              value={true}
              onClick={onChange}
              className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg 
              focus:shadow-lg active:shadow-lg transition ease-in-out duration-150 w-full ${
                !offer === "true"
                  ? "bg-slate-600 text-white"
                  : "bg-white text-black"
              }`}
            >
              yes
            </button>
            <button
              type="button"
              id="offer"
              value={true}
              onClick={onChange}
              className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg 
              focus:shadow-lg active:shadow-lg transition ease-in-out duration-150 w-full ${
                offer === "true"
                  ? "bg-white text-black"
                  : "bg-slate-600 text-white"
              }`}
            >
              no
            </button>
          </div>

          {/* Regular Price Section */}
          <div className="flex items-center mb-6">
            <div className="">
              <p className="text-lg font-semibold">Regular Price</p>
              <div className="flex w-full justify-center items-center space-x-6">
                <input
                  type="number"
                  id="regularPrice"
                  value={regularPrice}
                  onChange={onChange}
                  min="50"
                  max="400000000"
                  required
                  className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300
                  rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white
                  focus:border-slate-600 text-center"
                />
                {type === "rent" ? (
                  <></>
                ) : (
                  <>
                    <p className="text-xl font-semibold ml-2">$/Month</p>
                  </>
                )}
              </div>
            </div>
          </div>
          {/* End of Regular Price */}

          {/* Discounted Price Section */}
          {offer && (
            <div className="flex items-center mb-6">
              <div className="">
                <p className="text-lg font-semibold">Discounted Price</p>
                <div className="flex w-full justify-center items-center space-x-6">
                  <input
                    type="number"
                    id="discountedPrice"
                    value={discountedPrice}
                    onChange={onChange}
                    min="50"
                    max="400000000"
                    required={offer}
                    className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300
                  rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white
                  focus:border-slate-600 text-center"
                  />
                  {type === "rent" ? (
                    <></>
                  ) : (
                    <>
                      <p className="text-xl font-semibold ml-2">$/Month</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
          {/* End of Discounted Price Section */}

          {/* Images Section */}
          <div className="mb-6">
            <p className="text-lg font-semibold">Images</p>
            <p className="text-gray-600">
              The first image will be the cover (max 6)
            </p>
            <input
              type="file"
              id="images"
              onChange={onChange}
              accept=".jpg,.png,.jpeg"
              pl
              multiple
              required
              className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded
              transition ease-in-out duration-150 focus:bg-white focus:border-slate-600 mb-6"
            />
          </div>
          {/* End of Images Section */}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mb-6 px-7 py-3 bg-blue-600 text-white font-medium text-sm
            uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg
            active:bg-blue-800 active:shadow-xl transition duration-150 ease-in-out "
          >
            Create Listing
          </button>
          {/* End of Submit Button Section */}
        </form>
      </main>
    </>
  );
};

export default CreateListing;
