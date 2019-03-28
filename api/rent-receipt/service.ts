import { injectable } from "inversify";
import { ValidationErrorItem } from "joi";
import { RentReceiptRepository } from "./repository";
import { RentReceipt, RentReceiptStatus } from "./models";
import { NotificationService } from "../notification";
import { CreateRentReceiptDTO, UpdateRentReceiptDTO } from "./dtos";
import { Mail, PDFGenerator } from "../../utilities";
import { Config } from "../../config";

@injectable()
export class RentReceiptService {
  private name = "rent-receipts";
  private repo: RentReceiptRepository;
  private notifyService: NotificationService;
  private mail: Mail;
  private pdf: PDFGenerator;
  private config: Config;
  constructor(
    repo: RentReceiptRepository,
    notifyService: NotificationService,
    mail: Mail,
    pdf: PDFGenerator,
    config: Config
  ) {
    this.repo = repo;
    this.notifyService = notifyService;
    this.mail = mail;
    this.pdf = pdf;
    this.config = config;
  }
  async getAll(): Promise<RentReceipt[]> {
    try {
      const rentReceipts = await this.repo.getAll();
      return rentReceipts;
    } catch (error) {
      this.notifyService.notify(error.toString());
      throw new Error("Could Not Retrieve Rent Receipts");
    }
  }
  async getById(id: string): Promise<RentReceipt | null> {
    try {
      const rentReceipt = await this.repo.getById(id);
      return rentReceipt;
    } catch (error) {
      this.notifyService.notify(error.toString());
      throw new Error("Could Not Retrieve Rent Receipt");
    }
  }
  async create(
    input: CreateRentReceiptDTO
  ): Promise<{
    result: RentReceipt | null;
    validationErrors: ValidationErrorItem[] | null;
  }> {
    try {
      const rentReceipt = new RentReceipt(input);
      const validationErrors = rentReceipt.validate();
      if (validationErrors.length > 0) {
        return { result: null, validationErrors };
      }
      await this.repo.create(rentReceipt);
      await this.mail.send({
        to: this.config.contacts.office,
        from: {
          name: `${rentReceipt.firstName} ${rentReceipt.lastName}`,
          email: rentReceipt.email,
        },
        subject: `[Rent Receipt] ${rentReceipt.address} – 
          ${rentReceipt.firstName} ${rentReceipt.lastName} `,
        html: `<span>A new Rent Receipt Request has been received, 
          click <a href="${this.config.client.url}/${this.name}${
          rentReceipt.id
        }">here</a> to view.</span>`,
      });
      return { result: rentReceipt, validationErrors: null };
    } catch (error) {
      this.notifyService.notify(error.toString());
      throw new Error("Could Not Create Rent Receipt");
    }
  }
  async update(
    id: string,
    input: UpdateRentReceiptDTO
  ): Promise<{
    result: RentReceipt | null;
    validationErrors: ValidationErrorItem[] | null;
  }> {
    try {
      const rentReceipt = new RentReceipt(input);
      const validationErrors = rentReceipt.validate();
      if (validationErrors.length > 0) {
        return { result: null, validationErrors };
      }
      const oldReceipt = await this.repo.getById(id);
      if (!oldReceipt) {
        return { result: null, validationErrors: null };
      }

      rentReceipt.modifiedAt = new Date().toISOString();
      await this.repo.updateById(id, rentReceipt);

      // Decline
      if (
        oldReceipt.status === RentReceiptStatus.REQUESTED &&
        rentReceipt.status === RentReceiptStatus.DECLINED
      ) {
        this.decline(rentReceipt);
      } else if (
        oldReceipt.status === RentReceiptStatus.REQUESTED &&
        rentReceipt.status === RentReceiptStatus.APPROVED
      ) {
        this.approve(rentReceipt);
      } else {
        throw new Error("Invalid State Change");
      }
      return { result: rentReceipt, validationErrors: null };
    } catch (error) {
      this.notifyService.notify(error.toString());
      throw new Error("Could Not Update Rent Receipt");
    }
  }
  async approve(rentReceipt: RentReceipt) {
    try {
      const pdf = await this.pdf.generate("Hello World!");
      await this.mail.send({
        to: {
          name: `${rentReceipt.firstName} ${rentReceipt.lastName}`,
          email: rentReceipt.email,
        },
        from: this.config.contacts.office,
        subject: `Your rent receipt is ready`,
        text: `Hey ${
          rentReceipt.firstName
        }, please find your rent receipt attached to this email.`,
        attachments: [
          {
            content: pdf.toString("base64"),
            filename: `${rentReceipt.createdAt}-${rentReceipt.firstName}-${
              rentReceipt.lastName
            }-rent-receipt.pdf`,
            type: "application/pdf",
            disposition: "attachment",
            contentId: `${rentReceipt.id}`,
          },
        ],
      });
    } catch (error) {
      this.notifyService.notify(error.toString());
    }
  }
  async decline(rentReceipt: RentReceipt) {
    try {
      await this.mail.send({
        to: {
          name: `${rentReceipt.firstName} ${rentReceipt.lastName}`,
          email: rentReceipt.email,
        },
        from: this.config.contacts.office,
        subject: `Your rent receipt request was declined`,
        text: rentReceipt.message,
      });
    } catch (error) {
      this.notifyService.notify(error.toString());
    }
  }
}
