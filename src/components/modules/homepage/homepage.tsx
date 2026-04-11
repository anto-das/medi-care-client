import { medicineService } from "@/service/medicine.service";
import banner from "../../../assets/image_98f7fbd2.png";
import MediCard from "@/components/ui/mediCard";
import { Medicine } from "@/types";

import Testimonial from "@/components/ui/testimonial";
import Prescription from "@/components/ui/prescription";

import { ArrowRight } from "lucide-react";

// import { Medicine } from "@/types/medicine.type";
const Homepage = async () => {
  const { data } = await medicineService.getMedicines();
  // console.log("Medicines:", data.data);
  return (
    <div>
      <div className="w-full min-h-screen lg:h-170 relative">
        <img src={banner.src} alt="Banner" className="w-full h-full" />
        <div className="absolute inset-0 bg-[#0b5e4e] bg-opacity-40"></div>
        <div className="absolute inset-0 flex  items-center justify-between w-11/14 mx-auto">
          <div className="grid space-y-5">
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
              <div className="flex gap-4">
                {/* Browse Button */}
                <button className="flex items-center gap-2 rounded-xl bg-white px-7 py-4 font-bold text-[#062c1d] transition-transform active:scale-95">
                  Browse Medicines &rarr;
                </button>

                {/* Upload Button */}
                <button className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/5 px-7 py-4 font-bold text-white transition-all hover:bg-white/10 active:scale-95">
                  Upload Prescription
                  <span className="text-xl">📋</span>
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="border rounded-lg p-4 shadow-md">
              <h2>"Napa"</h2>
              <p>Manufacturer: "Square Pharmaceuticals"</p>
              {/* <img src={medi_img} alt={medicine_name} /> */}
              <p>Category: "Pain Relief"</p>
              <p>Price: $2.99</p>
              <p>Stock: 100</p>
            </div>
          </div>
        </div>
      </div>

      {/* medicine card items */}
      <div className="py-8  bg-[#faf8f4] my-10 border">
        <h1 className="text-3xl w-11/14 mx-auto font-bold">
          Medicines: {data.length}{" "}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-8 w-11/14 mx-auto">
          {data.map((medicine: Medicine) => (
            <MediCard key={medicine.medicine_id} medicine={medicine} />
          ))}
        </div>
      </div>
      {/* why mediCare */}
      <div className="my-10">
        <h1 className="text-center text-2xl md:text-3xl lg:text-5xl font-bold">
          Why MediCare?
        </h1>
        <p className="text-center text-lg text-[#8da197] mt-2 ">
          Bringing safe healthcare to every Bangladeshi home
        </p>
        <div className="w-11/14 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          <div className="border p-7 border-[#dde8e2] rounded-2xl hover:shadow-xl transition duration-500 hover:scale-100">
            <span className="text-2xl p-3 rounded-2xl bg-[#eff2f0]">🏪</span>
            <h1 className="my-6 text-xl font-extrabold">
              300+ Verified Sellers
            </h1>
            <p className="text-[#8da197]">
              All pharmacies are DGDA-licensed and regularly audited for
              authenticity and quality.
            </p>
          </div>
          <div className="border p-7 border-[#dde8e2] rounded-2xl hover:shadow-xl transition duration-500 hover:scale-100">
            <span className="text-2xl p-3 rounded-2xl bg-[#eff2f0]">🚴 </span>
            <h1 className="my-6 text-xl font-extrabold">Same-Day Delivery</h1>
            <p className="text-[#8da197] font-manrope">
              2-hour express delivery in Dhaka, Chittagong & Sylhet. Next-day
              across Bangladesh.
            </p>
          </div>
          <div className="border p-7 border-[#dde8e2] rounded-2xl hover:shadow-xl transition duration-500 hover:scale-100">
            <span className="text-2xl p-3 rounded-2xl bg-[#eff2f0]">📋</span>
            <h1 className="my-6 text-xl font-extrabold">Prescription Upload</h1>
            <p className="text-[#8da197]">
              Upload your Rx and our licensed pharmacists review and fulfill
              your order safely.
            </p>
          </div>
          <div className="border p-7 border-[#dde8e2] rounded-2xl hover:shadow-xl transition duration-500 hover:scale-100">
            <span className="text-2xl p-3 rounded-2xl bg-[#eff2f0]">🔒</span>
            <h1 className="my-6 text-xl font-extrabold">100% Genuine</h1>
            <p className="text-[#8da197]">
              Cold-chain storage, batch tracking, and anti-counterfeit
              verification on every order.
            </p>
          </div>
        </div>
      </div>
      {/* prescription */}
      <div className="bg-[#faf8f4] my-10 py-20 space-y-10">
        <Prescription />
        {/* testimonials */}
        <div className="w-11/12 mx-auto space-y-3">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            What Customers Say
          </h1>
          <p className="text-[#8da197] text-lg font-light">
            Trusted by 2 million+ Bangladeshis
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-8 mt-10">
            <Testimonial />
            <Testimonial />
            <Testimonial />
            <Testimonial />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
