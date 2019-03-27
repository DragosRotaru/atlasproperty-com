import { IoCContainer } from "../../ioc-container";
import { InquiryController } from "./controller";
import { results } from "inversify-express-utils";

describe("Task Controller", () => {
  beforeEach(() => {
    // create a snapshot so each unit test can modify
    // it without breaking other unit tests
    IoCContainer.snapshot();
  });

  afterEach(() => {
    // Restore to last snapshot so each unit test
    // takes a clean copy of the application container
    IoCContainer.restore();
  });

  const controller = IoCContainer.get(InquiryController);

  describe("Get All Tasks", () => {
    it("should have a status code of 200", async () => {
      const response = await (await controller.onGetAll()).executeAsync();
      expect(response).toBeInstanceOf(results.JsonResult);
      expect(response.statusCode).toEqual(200);
    });
  });
});
