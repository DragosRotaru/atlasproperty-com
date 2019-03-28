export const RentReceiptStatus = {
  REQUESTED: "Requested",
  APPROVED: "Approved",
  DECLINED: "Declined",
};

export type RentReceiptInput = {
  firstName: string,
  lastName: string,
  email: string,
  phone?: number,
  address: string,
  unit?: string,
  room?: string,
  rent: number,
  startDate: string,
  endDate: string,
  status?: "Requested" | "Approved" | "Declined",
  message?: string,
};

export type RentReceipt = RentReceiptInput & {
  _id: string,
  createdAt: string,
  modifiedAt: string,
};
