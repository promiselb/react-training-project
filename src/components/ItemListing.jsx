import React from "react";
import Card from "./Card";

const ItemListing = ({ item }) => {
  return (
    <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
      <Card item={item} />
    </div>
  );
};

export default ItemListing;
