import { Medicine } from "@/types";
import React from "react";

const MediCard = ({ medicine }: { medicine: Medicine }) => {
  const {
    medicine_name,
    manufacturer,
    medi_img,
    category_name,
    price,
    stock_quantity,
  } = medicine;
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h2>{medicine_name}</h2>
      <p>Manufacturer: {manufacturer}</p>
      {/* <img src={medi_img} alt={medicine_name} /> */}
      <p>Category: {category_name}</p>
      <p>Price: ${price}</p>
      <p>Stock: {stock_quantity}</p>
    </div>
  );
};

export default MediCard;
