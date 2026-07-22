import { AlertCircle } from "lucide-react";
import Link from "next/link";

const EmptyCart = () => {
  return (
    <div
      data-aos="fade-up"
      className="h-[70vh] flex flex-col items-center justify-center space-y-4"
    >
      <div className="bg-gray-100 p-8 rounded-full text-gray-400">
        <AlertCircle size={60} />
      </div>
      <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
      <p className="text-gray-500">
        Looks like you haven't added any medicine yet.
      </p>
      <Link
        href={"/medicine"}
        className="bg-[#0b5e4e] text-white px-8 py-3 rounded-xl font-bold transition-transform active:scale-95"
      >
        Start Shopping
      </Link>
    </div>
  );
};

export default EmptyCart;
