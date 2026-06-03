export interface Medicine {
  medicine_id: string;
  medicine_name: string;
  generic_name: string;
  manufacturer: string;
  medi_img: string;
  category_name: string;
  categoryId: string;
  category: string;
  seller_id: String;
  price: string | number;
  description: string;
  unit_type: string;
  stock_quantity: string | number;
  approval_status: string;
}

export enum ApprovalStatus {
  PENDING,
  APPROVED,
  REJECTED,
}
