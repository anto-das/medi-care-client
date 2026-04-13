import React from 'react'
import FeaturedProduct from './bannerFeaturedProd'
import { ArrowRight } from 'lucide-react'

const Banner = () => {
  return (
   <div className="w-full min-h-screen relative">
        <div className="absolute inset-0 bg-[#0b5e4e] bg-opacity-40"></div>
        {/* hero section */}
        <div className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center  md:justify-between lg:justify-between w-11/14 mx-auto">
          <div className="grid space-y-5 lg:py-5 w-full lg:w-1/2 mx-auto mt-10 lg:mt-0">
            <span className="p-3 rounded-xl text-sm font-bold text-white border bg-[#c1e4d32d] md:w-1/2 lg:w-1/3">
              🇧🇩 Bangladesh's Trusted Pharmacy Platform
            </span>
            <h1 className="mt-5 text-4xl md:text-5xl lg:text-7xl text-white font-black">
              Your Health,
              <br />
              <span className="text-[#02c897] italic my-2">Delivered</span>{" "}
              <br />
              to Your Door.
            </h1>
            <p className="text-[#afb4b2] text-xl font-light">
              Order genuine medicines from 300+ DGDA-verified pharmacies. Fast
              delivery across all 64 districts of Bangladesh.
            </p>
            <div className="flex flex-col gap-6">
              {/* Search Input and Button Group */}
              <div className="flex w-full items-center overflow-hidden rounded-xl border border-white/20 bg-white/10 shadow-sm transition-all focus-within:border-emerald-500/50">
                <input
                  type="text"
                  placeholder="Search medicine name, brand, or generic..."
                  className="w-full bg-transparent px-5 py-4 text-white placeholder-white/40 outline-none placeholder:font-medium"
                />
                <button className="flex items-end gap-2 bg-[#10b981] px-8 py-4 font-bold text-[#062c1d] transition-colors hover:bg-[#0da371]">
                  Search <ArrowRight />
                </button>
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-col lg:flex-row md:flex-row gap-4">
                {/* Browse Button */}
                <button className="flex items-center justify-center  p-4 rounded-xl bg-white  font-bold text-[#062c1d] transition-transform active:scale-95">
                  Browse Medicines &rarr;
                </button>

                {/* Upload Button */}
                <button className="flex items-center justify-center rounded-xl border border-white/20 bg-white/5 p-4 font-bold text-white transition-all hover:bg-white/10 active:scale-95">
                  Upload Prescription 📋
                </button>
              </div>
            </div>
          </div>
          {/* Featured Medicine */}
          <FeaturedProduct />
        </div>
      </div>
  )
}

export default Banner
