import Testimonial from "@/components/ui/testimonial";
import Prescription from "@/components/ui/prescription";

import Banner from "@/components/ui/banner";
import Medicines from "./medicines";

// import { Medicine } from "@/types/medicine.type";
const Homepage = () => {
  return (
    <div>
      {/* medicine card items */}
      <Medicines />
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
