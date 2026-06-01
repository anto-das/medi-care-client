import { medicineService } from "@/service/medicine.service";
import { Medicine } from "@/types";

const FeaturedProduct = async () => {
  const { data } = await medicineService.getMedicines({}, { revalidate: 60 });
  const medicines = data || [];
  if (medicines.length === 0) {
    return null;
  }
  const featuredProduct: Medicine = medicines?.reduce(
    (prev: Medicine, curr: Medicine) =>
      parseFloat(prev.price as string) < parseFloat(curr.price as string)
        ? prev
        : curr,
  );
  if (!featuredProduct) {
    return null;
  }
  return (
    <>
      <div className="w-1/4 mx-auto relative mt-10 lg:mt-0 hidden lg:block">
        <div className="border rounded-lg p-4 shadow-md bg-white space-y-2">
          <div className="h-48 w-1/2 mx-auto overflow-hidden rounded-lg">
            <img
              src={featuredProduct.medi_img}
              alt={featuredProduct.medicine_name}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <h1 className="text-xl font-bold">{featuredProduct.medicine_name}</h1>
          <h3 className="text-lg text-[#8da197]">
            {" "}
            {featuredProduct.manufacturer}{" "}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-600 justify-end">
            <span className="h-1 w-1 rounded-full bg-green-500"></span>{" "}
            <p className="text-green-500 font-bold text-end capitalize ">
              {" "}
              {featuredProduct.stock_quantity && "in stock"}
            </p>
          </div>
          <button className="bg-[#10b981] w-full text-white py-2 px-4 rounded-lg hover:bg-[#0da371] mt-10">
            Add to Cart
          </button>
        </div>
      </div>
      <div className="p-3 animate-float-slow hidden absolute top-9/16 right-80  rounded-lg bg-[#133d35]  lg:flex items-center gap-4 ">
        <span className="p-1 bg-[#507463] rounded-lg">✅</span>
        <div>
          <h5 className="text-white font-bold text-sm">Order confirmed!</h5>
          <p className="text-[#507463] font-light">Delivery in 2 hours</p>
        </div>
      </div>
      <div className="p-3 animate-float-slow absolute top-90 right-10  rounded-lg bg-[#133d35] hidden lg:flex items-center gap-4 ">
        <span className="p-1 bg-[#507463] rounded-lg">🚴</span>
        <div>
          <h5 className="text-white font-bold text-sm">Out for delivery</h5>
          <p className="text-[#507463] font-light">0.4km away</p>
        </div>
      </div>
    </>
  );
};

export default FeaturedProduct;
