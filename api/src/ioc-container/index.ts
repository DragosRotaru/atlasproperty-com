import "reflect-metadata";
import { Container, ContainerModule } from "inversify";
import { Config } from "../config";
import {
  InquiryController,
  InquiryService,
  InquiryRepository,
  Inquiry,
} from "../domain";
import { Server, Database, Logger, Mail, PDFGenerator } from "../utilities";

const config = new ContainerModule(bind => {
  bind<Config>(Config).toSelf();
});

// Domain
const inquiry = new ContainerModule(bind => {
  bind<InquiryController>(InquiryController).toSelf();
  bind<InquiryService>(InquiryService).toSelf();
  bind<InquiryRepository>(InquiryRepository).toSelf();
  bind<Inquiry>(Inquiry).toSelf();
});

// Utilities
const utilities = new ContainerModule(bind => {
  bind<Server>(Server)
    .toSelf()
    .inSingletonScope();
  bind<Logger>(Logger)
    .toSelf()
    .inSingletonScope();
  bind<Mail>(Mail)
    .toSelf()
    .inSingletonScope();
  bind<PDFGenerator>(PDFGenerator)
    .toSelf()
    .inSingletonScope();
  bind<Database>(Database)
    .toSelf()
    .inSingletonScope();
});

const IoCContainer = new Container();
IoCContainer.load(config, inquiry, utilities);

export { IoCContainer };
