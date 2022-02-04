import puppeteer from "puppeteer"

/**
 * handle Browser's functionalities
 * @class Browser
 */
export default class Browser {
  private browser: puppeteer.Browser
  private page: puppeteer.Page
  constructor(private url: string) {}

  /**
   * open the browser and go to amazon
   */
  async open() {
    this.browser = await puppeteer.launch({ headless: false })
    this.page = await this.browser.newPage()
    await this.page.setViewport({ width: 1366, height: 768 })
    await this.page.goto(this.url)
  }
  /**
   * search about specific book by text
   * @param text
   */
  async search(text: string) {
    await this.page.waitForSelector("div.nav-search-field > input")
    await this.page.$eval("div.nav-search-field > input", (el: any, value) => (el.value = value), text)
    await this.page.click("input#nav-search-submit-button")
    await this.page.waitForNavigation({
      waitUntil: "networkidle0",
    })
  }
  /**
   * select best option
   */
  async findAndSelectTheBest() {
    await this.page.waitForSelector("span.s-latency-cf-section", { visible: true })
    const card = await this.page.$$('img[data-image-index="1"]')
    if (card.length <= 0) throw new Error("There is no values matched with img[data-image-index='1']")
    await card[0].click()
    await this.page.waitForNavigation({
      waitUntil: "networkidle0",
    })
  }

  /**
   * click on buy button
   */
  async buyItem() {
    await this.page.waitForSelector('input[id="buy-now-button"]', { visible: true })
    const button = await this.page.$$('input[id="buy-now-button"]')
    if (button.length <= 0) throw new Error("There is no values matched with input[id='buy-now-button']")
    await button[0].click()
  }
  /**
   * close the browser
   */
  async close() {
    await this.browser.close?.()
  }
}
