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
    <div className="border relative border-[#c1e6db] rounded-2xl  shadow-md hover:shadow-xl transition duration-500 hover:scale-102">
      <p className="text-center text-5xl py-14 rounded-t-2xl flex items-center justify-center bg-[#e8f6f2] ">
        💊
      </p>
      <div className="p-4 space-y-2">
        <h2 className="text-lg font-bold capitalize">{medicine_name}</h2>
        <p className="text-[#8da197] capitalize"> 🏭 {manufacturer}</p>
        {/* <img src={medi_img} alt={medicine_name} /> */}
        <p className="text-[#8da197] capitalize"> {category_name}</p>
        <p className="text-xl font-bold text-green-700 capitalize">
          ${price} / unit_type{" "}
        </p>
        <p className="text-[#8da197] capitalize">
          Stock: {Number("0") ? stock_quantity : "Out of Stock"}
        </p>
      </div>
      <div className="border-t border-[#c1e6db] py-6 text-xs font-medium text-muted-foreground md:flex-row md:items-center md:text-left">
        <div className="mx-4 flex items-center justify-between">
          <p className="text-[#8da197]">
            {" "}
            {Number(stock_quantity) > 0
              ? `${stock_quantity} left`
              : "unavailable"}{" "}
          </p>
          <button className="bg-[#0b5e4e] hover:bg-[#098169] text-white font-bold py-2 px-4 rounded">
            Add to Cart
          </button>
        </div>
        <div>
          {" "}
          {Number(stock_quantity) > 10 ? (
            <div className="flex items-center gap-2 text-sm text-gray-600 justify-end bg-[#dcfce7] p-2 rounded absolute top-5 right-5">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>{" "}
              <p className="text-green-500 font-bold text-end capitalize ">
                {" "}
                in-stock
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-gray-600 justify-end bg-[#fdecea] py-1 px-2 rounded absolute top-5 right-5">
              <span className="h-2 w-2 rounded-full bg-red-500 "></span>{" "}
              <p className="text-red-500 font-bold text-end capitalize ">
                {" "}
                out
              </p>
            </div>
          )}{" "}
        </div>
      </div>
    </div>
  );
};

export default MediCard;
