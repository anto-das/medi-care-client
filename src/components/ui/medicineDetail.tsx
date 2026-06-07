"use client";

import React, { useState } from "react";
import {
  Minus,
  Plus,
  Heart,
  Truck,
  RotateCcw,
  ShieldCheck,
  ExternalLink,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Medicine } from "@/types";
import { handleAddToCart } from "@/app/utilis/handleAddToCart";

export default function MedicineDetailsClient({
  medicine,
}: {
  medicine: Medicine;
}) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* বাম পাশ: ইমেজ এবং ডেসক্রিপশন */}
      <div className="space-y-4">
        <div className="bg-[#e8f6f2] rounded-3xl aspect-video flex items-center justify-center text-9xl border border-[#c1e6db]">
          <img
            src={medicine.medi_img}
            alt={medicine.medicine_name}
            className="w-full"
          />
        </div>

        {/* ডেসক্রিপশন ট্যাব (সার্ভার সাইড সেফ) */}
        <div className="mt-12 hidden lg:block">
          <div className="flex gap-8 border-b border-gray-200 mb-6 text-sm font-semibold">
            <span className="border-b-2 border-[#0b5e4e] pb-2 text-black cursor-pointer">
              Description
            </span>
            <span className="text-gray-500 cursor-pointer">
              Details & Specs
            </span>
          </div>
          <p className="text-gray-600 leading-relaxed capitalize">
            {medicine.description}
          </p>
        </div>
      </div>

      {/* ডান পাশ: ইনফরমেশন */}
      <div className="space-y-6">
        <div className="flex gap-2">
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">
            ● In Stock
          </Badge>
          <Badge variant="outline" className="capitalize">
            {medicine.manufacturer}
          </Badge>
        </div>

        <div>
          <h1 className="text-4xl font-bold capitalize text-gray-900">
            {medicine.medicine_name} {medicine.unit_type}
          </h1>
          <p className="text-gray-500 text-lg">
            {medicine.generic_name} • {medicine.category_name}
          </p>
        </div>

        <div className="bg-[#f3f4f6]/50 p-6 rounded-2xl border border-gray-100">
          <h2 className="text-4xl font-bold text-gray-900">
            ${medicine.price}.00
          </h2>
          <p className="text-sm text-gray-500 mt-1">Per {medicine.unit_type}</p>
        </div>

        {/* কুয়ান্টিটি কন্ট্রোল */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-gray-700">Quantity</label>
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-gray-100"
              >
                <Minus size={18} />
              </button>
              <span className="w-12 text-center font-bold">{quantity}</span>
              <button
                onClick={() =>
                  setQuantity(
                    Math.min(Number(medicine.stock_quantity), quantity + 1),
                  )
                }
                className="p-2 hover:bg-gray-100"
              >
                <Plus size={18} />
              </button>
            </div>
            <span className="text-sm text-gray-400">
              {medicine.stock_quantity} left in stock
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={() => handleAddToCart(medicine.medicine_id, quantity)}
            className="flex-1 bg-[#0b5e4e] hover:bg-[#084a3e] h-14 text-lg font-bold rounded-xl shadow-lg"
          >
            Add to Cart
          </Button>
          <Button
            variant="outline"
            className="h-14 w-14 rounded-xl border-gray-200"
          >
            <Heart className="text-gray-400" />
          </Button>
        </div>

        {/* ট্রাস্ট ব্যাজ */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Truck size={18} className="text-[#0b5e4e]" />
            <span>
              <span className="font-bold">2-hour Express</span> delivery in
              Dhaka
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <ShieldCheck size={18} className="text-[#0b5e4e]" />
            <span>
              DGDA Verified <span className="font-medium">Genuine Product</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
