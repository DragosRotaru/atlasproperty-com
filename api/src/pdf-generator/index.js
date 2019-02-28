import puppeteer, {
  LaunchOptions,
  NavigationOptions,
  PDFOptions,
} from "puppeteer";

export class PDFGenerator {
  browser;
  initialized: boolean = false;
  constructor() {}
  async init(options: LaunchOptions) {
    this.browser = await puppeteer.launch(options);
    this.initialized = true;
  }
  async generate(
    html: string,
    options: { pdf: PDFOptions, remoteContent: boolean }
  ): Buffer {
    if (!this.initialized) {
      throw new Error("initialize before using");
    }
    if (typeof html !== "string") {
      throw new Error(
        "Invalid Argument: HTML expected as type of string and received a value of a different type. Check your request body and request headers."
      );
    }
    const page = await this.browser.newPage();
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
