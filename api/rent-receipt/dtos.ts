import { RentReceiptStatus } from "./models";

export type CreateRentReceiptDTO = {
  startDate: string;
  endDate: string;
  rent: number;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone?: string;
  unit?: string;
  room?: string;
  message?: string;
};

export type UpdateRentReceiptDTO = {
  status: RentReceiptStatus;
  startDate: string;
  endDate: string;
  rent: number;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone?: string;
  unit?: string;
  room?: string;
  message?: string;
};
