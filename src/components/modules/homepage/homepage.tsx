import Testimonial from "@/components/ui/testimonial";
import Prescription from "@/components/ui/prescription";

import Medicines from "./medicines";

import WhyMedicineCare from "@/components/ui/WhyMedicineCare";
import Banner from "@/components/ui/banner";
import CategoriesMarque from "@/components/ui/categoriesMarque";
import CategoryMarquee from "@/components/ui/categoriesMarque";
import CustomerVoiceSection from "./feedback";
import { ChartBarDemoLegend } from "./chart";

const Homepage = () => {
  return (
    <div>
      <Banner />
      <CategoriesMarque></CategoriesMarque>

      <div className="my-10">
        <WhyMedicineCare />
      </div>
      <Medicines />
      <ChartBarDemoLegend />
      {/* prescription */}
      <CustomerVoiceSection></CustomerVoiceSection>
    </div>
  );
};

export default Homepage;
