export type OrderItem = {
  item_id: string;
  order_id: string;
  quantity: number;
  price: string;
};

export type Order = {
  order_id: string;
  customer_email: string;
  customer_name: string;
  seller_id: string;
  status: Status;
  total_bill: string;
  order_date: string;
  orderItems: OrderItem[];
};

enum Status {
  "PENDING",
  "PROCESSING",
  "COMPLETED",
  "CANCELLED",
}
interface Orders {
  id: string;
  customer: string;
  total: string;
  date: string;
  status: Status;
}

