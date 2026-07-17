"use client";

import { getMedicine } from "@/app/actions/medicine.action";
import { handleAddToCart } from "@/app/utilis/handleAddToCart";
import { Medicine } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, CheckCircle2, Bike, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/MedicineContext";

const FeaturedProduct = () => {
  const [data, setData] = useState<Medicine[]>([]);
  const router = useRouter();
  const { setCarts, user_id, guest_id } = useCart();

  useEffect(() => {
    (async () => {
      const { data: medi } = await getMedicine({}, { revalidate: 10 });
      setData(medi);
    })();
  }, []);

  const medicines = data || [];
  if (medicines.length === 0) return null;

  const medicinesWithApproval = medicines.filter(
    (medicine: Medicine) => medicine.approval_status === "APPROVED",
  );
  if (medicinesWithApproval.length === 0) return null;

  // ফাইন্ড হায়েস্ট প্রাইসড অপ্রুভড মেডিসিন
  const featuredProduct: Medicine = medicinesWithApproval.reduce(
    (prev: Medicine, curr: Medicine) =>
      parseFloat(prev.price as string) < parseFloat(curr.price as string)
        ? curr
        : prev,
  );

  if (!featuredProduct) return null;

  const handleCardClick = (medicine_id: string) => {
    router.push(`/medicine/${medicine_id}`);
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center p-4">
      {/* 1. Main Featured Product Card */}
      <motion.div
        onClick={() => handleCardClick(featuredProduct.medicine_id)}
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="w-full bg-white border border-slate-100 rounded-3xl p-5 shadow-xl shadow-slate-100/70 space-y-4 cursor-pointer relative z-10 overflow-hidden group"
      >
        {/* Subtle Decorative Gradient inside card */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Top Header Label */}
        <div className="flex items-center justify-between">
          <Badge
            variant="secondary"
            className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border border-emerald-100 gap-1 text-xs px-2.5 py-1 font-semibold"
          >
            <Award className="h-3 w-3" /> Featured Medicine
          </Badge>

          {/* Stock Status Badge */}
          {featuredProduct.stock_quantity && (
            <div className="flex items-center gap-1.5 bg-emerald-50/50 px-2 py-1 rounded-full border border-emerald-100/50">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <p className="text-emerald-600 font-bold text-xs uppercase tracking-wider">
                In Stock
              </p>
            </div>
          )}
        </div>

        {/* Medicine Product Image */}
        <div className="h-44 w-full bg-slate-50 overflow-hidden rounded-2xl relative border border-slate-100 flex items-center justify-center group-hover:shadow-inner transition-all">
          <img
            src={featuredProduct.medi_img}
            alt={featuredProduct.medicine_name}
            className="h-full max-h-[160px] object-contain p-2 transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Product Meta */}
        <div className="space-y-1">
          <h2 className="text-xl font-extrabold text-slate-800 tracking-tight group-hover:text-emerald-600 transition-colors line-clamp-1">
            {featuredProduct.medicine_name}
          </h2>
          <h3 className="text-sm font-medium text-slate-400 line-clamp-1">
            by {featuredProduct.manufacturer}
          </h3>
        </div>

        {/* Add to Cart Shadcn Button */}
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart(
              featuredProduct.medicine_id,
              1,
              setCarts,
              user_id,
              guest_id,
            );
          }}
          className="w-full h-12 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-md shadow-emerald-600/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group/btn"
        >
          <ShoppingCart className="h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5" />
          Add to Cart
        </Button>
      </motion.div>

      {/* 2. Floating Notification Badge 1: Order Confirmed */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="hidden xl:flex absolute -left-20 top-12 p-3 items-center gap-3 rounded-2xl bg-white/80 border border-slate-100 shadow-lg shadow-slate-200/50 backdrop-blur-md z-20"
      >
        <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <div>
          <h5 className="text-slate-800 font-bold text-xs">Order confirmed!</h5>
          <p className="text-slate-400 font-medium text-[11px]">
            Delivery in 2 hours
          </p>
        </div>
      </motion.div>

      {/* 3. Floating Notification Badge 2: Out For Delivery */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="hidden xl:flex absolute -right-16 bottom-8 p-3 items-center gap-3 rounded-2xl bg-white/80 border border-slate-100 shadow-lg shadow-slate-200/50 backdrop-blur-md z-20"
      >
        <div className="p-2 bg-amber-50 rounded-xl border border-amber-100 text-amber-600">
          <Bike className="h-5 w-5" />
        </div>
        <div>
          <h5 className="text-slate-800 font-bold text-xs">Out for delivery</h5>
          <p className="text-slate-400 font-medium text-[11px]">0.4km away</p>
        </div>
      </motion.div>
    </div>
  );
};

export default FeaturedProduct;
