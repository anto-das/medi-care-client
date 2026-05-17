import { sellerService } from "@/service/seller.service";

const page = async () => {
  const { data } = await sellerService.getSellerMedicines();
  // console.log(data);
  return <div>this is medicine page... : {data?.length} </div>;
};

export default page;
