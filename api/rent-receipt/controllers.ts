import { injectable } from "inversify";
import { Server } from "../../providers";
import { RentReceiptService } from "./service";

@injectable()
export class RentReceiptController {
  name = "rent-receipts";
  service: RentReceiptService;
  server: Server;
  constructor(service: RentReceiptService, server: Server) {
    this.service = service;
    this.server = server;

    const app = this.server.app;
    app.get(`/${this.name}`, authenticated, async (req, res) => {
      try {
        res.status(200).json(await this.service.getAll());
      } catch (error) {
        res.status(500).send(error.toString());
      }
    });
    app.get(`/${this.name}/:id`, authenticated, async (req, res) => {
      try {
        const id = req.params["id"];
        res.status(200).json(await this.service.getById(id));
      } catch (error) {
        res.status(500).send(error.toString());
      }
    });
    app.post(`/${this.name}`, async (req, res) => {
      try {
        const { validationErrors } = await this.service.create(req.body);
        if (validationErrors) {
          res.status(400).json(validationErrors);
        } else {
          res.status(200).send("Request sent successfully!");
        }
      } catch (error) {
        res.status(500).send(error.toString());
      }
    });

    app.put(`/${this.name}/:id`, authenticated, async (req, res) => {
      try {
        const id = req.params["id"];
        const { result, validationErrors } = await this.service.update(
          id,
          req.body
        );
        if (validationErrors) {
          res.status(400).json(validationErrors);
        } else if (!result) {
          res.status(404).send("Rent receipt doesn't exist");
        } else {
          res.status(200).send("Request updated successfully!");
        }
      } catch (error) {
        res.status(500).send(error.toString());
      }
    });
  }
}
