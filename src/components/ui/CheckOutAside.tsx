import { AlertCircle, ArrowRight, ShieldCheck } from "lucide-react";
import React from "react";

const CheckOutAside = ({
  subtotal,
  deliveryFee,
  discount,
  total,
}: {
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
}) => {
  return (
    <aside className="lg:col-span-4 sticky top-10">
      <div className="bg-white p-8 rounded-[40px] shadow-2xl shadow-gray-200/50 border border-gray-50">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Order Summary</h2>

        <div className="space-y-5 mb-8">
          <div className="flex justify-between text-gray-500 font-medium">
            <span>Subtotal</span>
            <span className="text-gray-900 font-bold">
              ৳{subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-gray-500 font-medium">
            <span>Delivery Fee</span>
            <span className="text-gray-900 font-bold">
              ৳{deliveryFee.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-green-600 font-medium">
            <span>Promo Discount</span>
            <span className="font-bold">-৳{discount.toFixed(2)}</span>
          </div>

          <div className="pt-5 border-t border-dashed border-gray-200">
            <div className="flex justify-between items-end">
              <span className="text-gray-900 font-bold text-lg">
                Total Amount
              </span>
              <span className="text-3xl font-black text-[#1b3d2f]">
                ৳{total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div className="relative mb-8 group">
          <input
            type="text"
            placeholder="Enter promo code"
            className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-5 py-4 focus:bg-white focus:border-green-500 outline-none transition-all"
          />
          <button className="absolute right-2 top-2 bottom-2 bg-gray-900 text-white px-5 rounded-xl font-bold hover:bg-black transition-colors">
            Apply
          </button>
        </div>

        <button className="w-full bg-[#0b5e4e] text-white py-3 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-[#0d866e] shadow-xl shadow-green-900/20 active:scale-[0.98] transition-all">
          Proceed to Checkout <ArrowRight size={20} />
        </button>

        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-3 text-amber-600 bg-amber-50 p-3 rounded-xl border border-amber-100">
            <AlertCircle size={18} />
            <p className="text-xs font-bold uppercase">Prescription Required</p>
          </div>
          <div className="flex items-center justify-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
            <ShieldCheck size={14} className="text-green-500" /> Secure SSL
            Encryption
          </div>
        </div>
      </div>
    </aside>
  );
};

export default CheckOutAside;
