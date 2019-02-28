import express from "express";
import bodyParser from "body-parser";
import mongo from "mongodb";
import sendGrid from "@sendgrid/mail";
import debug from "debug";
import { PDFGenerator } from "./pdf-generator";
import {
  config,
  type RentReceipt,
  type RentReceiptInput,
  RentReceiptStatus,
} from "../../common/src";

(async () => {
  // Debug Logging
  const log = debug(config.name);

  // MongoDB
  const MongoClient = mongo.MongoClient;
  const client = new MongoClient(config.db.url);
  await client.connect();
  const db = client.db(config.name);
  log("MongoDB Initialized Successfully");

  // SendGrid Mail
  sendGrid.setApiKey("api_key");
  log("SendGrid Initialized Successfully");

  // PDF Generator
  const pdfGenerator = new PDFGenerator();
  await pdfGenerator.init();
  log("PDFGenerator Initialized Successfully");

  // Express Server
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static("client/build"));

  // Rent Receipt
  const rentReceiptName = config.models.rentReceipts.name;
  const rentReceiptAPI = config.models.rentReceipts.api;
  const rentReceiptClient = config.models.rentReceipts.client;

  const rentReceipts = db.collection(rentReceiptName);

  // Get All
  app.get(rentReceiptAPI, async (req, res) => {
    try {
      const result: RentReceipt[] = await rentReceipts.find({}).toArray();
      res.json(200, result);
    } catch (error) {
      await sendGrid.send({
        to: config.contacts.admin,
        from: config.contacts.office,
        subject: `${config.name} error: GET ALL ${rentReceiptName}`,
        text: error.toString(),
      });
      res.send(
        500,
        "An error has occured and the administrator has been notified. please try again in 24 hours."
      );
    }
  });

  // Get By Id
  app.get(`${rentReceiptAPI}/:id`, async (req, res) => {
    try {
      const result: RentReceipt = await rentReceipts.findOne({
        _id: req.params["id"],
      });
      res.json(200, result);
    } catch (error) {
      await sendGrid.send({
        to: config.contacts.admin,
        from: config.contacts.office,
        subject: `${config.name} error: GET BY ID ${rentReceiptName}`,
        text: error.toString(),
      });
      res.send(
        500,
        "An error has occured and the administrator has been notified. please try again in 24 hours."
      );
    }
  });

  // Create
  app.post(rentReceiptAPI, async (req, res) => {
    const rentReceiptInput: RentReceiptInput = req.body;
    const createdAt = new Date();
    const rentReceipt: RentReceipt = {
      ...rentReceiptInput,
      status: "Requested",
      createdAt: createdAt.toISOString(),
      modifiedAt: createdAt.toISOString(),
    };
    try {
      const dbResponse = await rentReceipts.insertOne(rentReceipt);
      if (dbResponse.result.ok) {
        await sendGrid.send({
          to: config.contacts.office,
          from: {
            name: `${rentReceipt.firstName} ${rentReceipt.lastName}`,
            email: rentReceipt.email,
          },
          subject: `[Rent Receipt] ${rentReceipt.address} – 
          ${rentReceipt.firstName} ${rentReceipt.lastName} `,
          html: `<span>A new Rent Receipt Request has been received, 
          click <a href="${rentReceiptClient}/${
            dbResponse.ops[0]._id
          }">here</a> to view.</span>`,
        });
        res.send(200, "Request sent successfully!");
      } else {
        throw new Error("DB Response Did not return OK");
      }
    } catch (error) {
      await sendGrid.send({
        to: config.contacts.admin,
        from: config.contacts.office,
        subject: `${config.name} error: POST ${rentReceiptName}`,
        text: error.toString(),
      });
      res.send(
        500,
        "An error has occured and the administrator has been notified. please try again in 24 hours."
      );
    }
  });

  // Update
  app.put(`${rentReceiptAPI}/:id`, async (req, res) => {
    try {
      // New Version
      const newReceipt: RentReceiptInput = req.body;

      // Get Old Version
      const oldReceipt: RentReceipt = await rentReceipts.findOne({
        _id: req.params["id"],
      });

      // Doesn't Exist
      if (!oldReceipt) {
        res.send(404, "Rent Receipt doesn't exist");
        return;
      }

      // Invalid State Change
      if (
        oldReceipt.status === newReceipt.status ||
        (oldReceipt.status === RentReceiptStatus.DECLINED &&
          newReceipt.status === RentReceiptStatus.REQUESTED) ||
        (oldReceipt.status === RentReceiptStatus.APPROVED &&
          newReceipt.status === RentReceiptStatus.REQUESTED) ||
        (oldReceipt.status === RentReceiptStatus.DECLINED &&
          newReceipt.status === RentReceiptStatus.APPROVED) ||
        (oldReceipt.status === RentReceiptStatus.APPROVED &&
          newReceipt.status === RentReceiptStatus.DECLINED)
      ) {
        res.send(400, "Invalid State Change");
        return;
      }

      // ModifiedAt
      const modifiedAt = new Date().toISOString();

      // Update
      const dbResponse = await rentReceipts.updateOne(
        { _id: req.params["id"] },
        { ...newReceipt, modifiedAt }
      );
      if (!dbResponse.result.ok) {
        throw new Error("DB Response Did not return OK");
      }

      // Decline
      if (
        oldReceipt.status === RentReceiptStatus.REQUESTED &&
        newReceipt.status === RentReceiptStatus.DECLINED
      ) {
        debug(`Rent Receipt Declined: ${oldReceipt._id}`);
        await sendGrid.send({
          to: {
            name: `${newReceipt.firstName} ${newReceipt.lastName}`,
            email: newReceipt.email,
          },
          from: config.contacts.office,
          subject: `Your rent receipt request was declined`,
          text: newReceipt.message,
        });
        res.send(200, "Request Declined successfully!");
      }
      // Approve
      if (
        oldReceipt.status === RentReceiptStatus.REQUESTED &&
        newReceipt.status === RentReceiptStatus.APPROVED
      ) {
        debug(`Rent Receipt Approved: ${oldReceipt._id}`);
        const pdf = await pdfGenerator.generate("Hello World!");
        await sendGrid.send({
          to: {
            name: `${newReceipt.firstName} ${newReceipt.lastName}`,
            email: newReceipt.email,
          },
          from: config.contacts.office,
          subject: `Your rent receipt is ready`,
          text: `Hey ${
            newReceipt.firstName
          }, please find your rent receipt attached to this email.`,
          attachments: [
            {
              content: pdf.toString("base64"),
              filename: `${oldReceipt.createdAt}-${newReceipt.firstName}-${
                newReceipt.lastName
              }-rent-receipt.pdf`,
              type: "application/pdf",
              disposition: "attachment",
              contentId: `${oldReceipt._id}`,
            },
          ],
        });
        res.send(200, "Request Approved successfully!");
      }
    } catch (error) {
      await sendGrid.send({
        to: config.contacts.admin,
        from: config.contacts.office,
        subject: `${config.name} error: PUT ${rentReceiptName}`,
        text: error.toString(),
      });
      res.send(
        500,
        "An error has occured and the administrator has been notified. please try again in 24 hours."
      );
    }
  });

  app.listen(config.api.port, error => {
    if (error) {
      log("error", error);
    } else {
      log("info", `${config.name} API Initialized on ${config.api.port}`);
    }
  });
})();
