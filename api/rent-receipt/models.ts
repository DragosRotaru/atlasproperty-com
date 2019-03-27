import { Entity } from "../entity";
import { rentReceiptValidator } from "./validators";
import { CreateRentReceiptDTO } from "./dtos";

export enum RentReceiptStatus {
  REQUESTED = "Requested",
  APPROVED = "Approved",
  DECLINED = "Declined",
}

export class RentReceipt extends Entity {
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
  constructor(createDTO: CreateRentReceiptDTO) {
    super();
    this.status = RentReceiptStatus.REQUESTED;
    this.startDate = createDTO.startDate;
    this.endDate = createDTO.endDate;
    this.rent = createDTO.rent;
    this.firstName = createDTO.firstName;
    this.lastName = createDTO.lastName;
    this.email = createDTO.email;
    this.address = createDTO.address;
    this.phone = createDTO.phone;
    this.unit = createDTO.unit;
    this.room = createDTO.room;
    this.message = createDTO.message;
  }
  validate() {
    return rentReceiptValidator(this);
  }
}
