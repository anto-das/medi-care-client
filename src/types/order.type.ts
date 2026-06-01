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
  status: orderType;
  total_bill: string;
  order_date: string;
  orderItems: OrderItem[];
  seller_name: string;
};

export enum orderType {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}
interface Orders {
  id: string;
  customer: string;
  total: string;
  date: string;
  status: orderType;
}
