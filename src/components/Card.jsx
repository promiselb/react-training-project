import React, { useState } from "react";
import { Link } from "react-router-dom";

const Card = ({ item, onRentClick }) => {
  const {
    id,
    name,
    description: fullDescription = "",
    price,
    isAvailable,
    imageUrl,
    category,
    brand,
  } = item;

  const [showFullDescription, setShowFullDescription] = useState(false);
  const description = showFullDescription
    ? fullDescription
    : fullDescription.substring(0, 90) + (fullDescription.length > 90 ? "..." : "");

  return (
    <div
      key={id}
      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
    >
      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={imageUrl || "assets/images/placeholder.jpg"}
          alt={name}
          className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
        />

        {/* Availability Badge */}
        <span
          className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full ${
            isAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {isAvailable ? "Available" : "Unavailable"}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-4">
        {/* Title + Brand */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{name}</h3>
          <p className="text-sm text-gray-500">{brand}</p>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-2">{description}</p>

        {/* Show More / Less */}
        {fullDescription.length > 90 && (
          <button
            onClick={() => setShowFullDescription((prev) => !prev)}
            className="text-indigo-500 text-sm mb-4 hover:text-indigo-600 self-start"
          >
            {showFullDescription ? "Show Less" : "Read More"}
          </button>
        )}

        {/* Category + Price */}
        <div className="flex justify-between items-center mt-auto mb-4">
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
            {category}
          </span>
          <span className="text-blue-600 font-semibold">${price}/day</span>
        </div>

        {/* Action Buttons (Both Inside the Card) */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => onRentClick && onRentClick(item)}
            disabled={!isAvailable}
            className={`w-full py-2 rounded-lg font-medium transition-colors duration-200 ${
              isAvailable
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isAvailable ? "Rent Now" : "Not Available"}
          </button>

          <Link
            to={`/items/${id}`}
            className="w-full text-center bg-indigo-600 text-white text-sm font-medium py-2 rounded-lg shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
