import puppeteer, { LaunchOptions, PDFOptions } from "puppeteer";
import { injectable } from "inversify";

@injectable()
export class PDFGenerator {
  private browser?: puppeteer.Browser;
  async init(options?: LaunchOptions) {
    this.browser = await puppeteer.launch(options);
  }
  async generate(
    html: string,
    options?: { pdf?: PDFOptions; remoteContent?: boolean }
  ): Promise<Buffer> {
    if (!this.browser) {
      throw new Error("initialize before using");
    }
    const page = await this.browser.newPage();

    if (typeof html !== "string") {
      throw new Error(
        "Invalid Argument: HTML expected as type of string and received a value of a different type. Check your request body and request headers."
      );
    }
    if (!options) {
      options = {};
    }
    if (!options.pdf) {
      options.pdf = { format: "Letter" };
    }
    if (options.remoteContent === true) {
      await page.goto(`data:text/html,${html}`, {
        waitUntil: ["load", "domcontentloaded", "networkidle0"],
      });
    } else {
      // page.setContent will be faster than page.goto if html is a static
      await page.setContent(html);
    }
    const result = await page.pdf(options.pdf);
    page.close();
    return result;
  }
}
