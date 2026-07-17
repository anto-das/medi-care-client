import Testimonial from "@/components/ui/testimonial";
import Prescription from "@/components/ui/prescription";

import Medicines from "./medicines";

import WhyMedicineCare from "@/components/ui/WhyMedicineCare";
import Banner from "@/components/ui/banner";
import CategoriesMarque from "@/components/ui/categoriesMarque";
import CategoryMarquee from "@/components/ui/categoriesMarque";

const Homepage = () => {
  return (
    <div>
      <Banner />
      <CategoriesMarque></CategoriesMarque>
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
          <WhyMedicineCare />
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
          <div>
            <Testimonial />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
