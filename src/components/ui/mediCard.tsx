"use client";

import { handleAddToCart } from "@/app/utilis/handleAddToCart";
import { useCart } from "@/hooks/MedicineContext";
import { Medicine } from "@/types";
import { useRouter } from "next/navigation";

const MediCard = ({ medicine }: { medicine: Medicine }) => {
  const {
    medicine_id,
    medicine_name,
    manufacturer,
    medi_img,
    generic_name,
    category_name,
    price,
    stock_quantity,
  } = medicine;
  const router = useRouter();
  const { guest_id, setCarts, user_id } = useCart();

  const handleCardClick = (medicine_id: string) => {
    router.push(`/medicine/${medicine_id}`); // আপনার ডিটেইল পেজের পাথ দিন
  };

  return (
    <div
      onClick={() => handleCardClick(medicine_id)}
      className="border relative border-[#c1e6db] rounded-2xl  shadow-md hover:shadow-xl transition duration-500 hover:scale-101  antialiased will-change-contents transform-gpu"
    >
      <div className="h-48 w-full overflow-hidden rounded-t-2xl">
        <img
          src={medi_img}
          alt={medicine_name}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="px-4 py-2 space-y-1">
        <h2 className="text-lg font-bold capitalize">{medicine_name}</h2>
        <p className="text-[#8da197] capitalize"> 🏭 {manufacturer}</p>
        <p className="text-[#8da197] capitalize"> {category_name}</p>
        <p className="text-xl font-bold text-green-700 capitalize">
          ${price} / {generic_name}{" "}
        </p>
      </div>
      <div className="border-t border-[#c1e6db] py-3 text-xs font-medium text-muted-foreground md:flex-row md:items-center md:text-left">
        <div className="mx-4 flex items-center justify-between">
          <p className="text-[#8da197]">
            {" "}
            {Number(stock_quantity) > 0
              ? `${stock_quantity} left`
              : "unavailable"}{" "}
          </p>
          {stock_quantity ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(medicine_id, 1, setCarts, user_id, guest_id);
              }}
              className="bg-[#0b5e4e] hover:bg-[#098169] text-white font-bold py-2 px-4 rounded"
            >
              Add to Cart
            </button>
          ) : (
            <button
              disabled
              className="bg-[#0b5e4e] opacity-50 cursor-not-allowed text-white font-bold py-2 px-4 rounded"
            >
              Add to Cart
            </button>
          )}
        </div>
        <div>
          {" "}
          {Number(stock_quantity) > 0 ? (
            <div className="flex items-center rounded-3xl gap-2 text-sm text-gray-600 justify-end bg-[#dcfce7] p-2 absolute top-5 right-5">
              <span className="h-1 w-1 rounded-full bg-green-500"></span>{" "}
              <p className="text-green-500 font-bold text-end capitalize ">
                {" "}
                in-stock
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-gray-600 justify-end bg-[#fdecea] py-1 px-2 rounded-3xl absolute top-5 right-5">
              <span className="h-1 w-1 rounded-full bg-red-500 "></span>{" "}
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
