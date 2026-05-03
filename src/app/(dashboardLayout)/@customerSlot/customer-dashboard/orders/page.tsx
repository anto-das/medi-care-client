import { orderService } from "@/service/order.service";

const Orders = async () => {
  const { data } = await orderService.getOrders();
  //   console.log("result form order route : ", data);
  return <div>hello this is order page...</div>;
};

export default Orders;
