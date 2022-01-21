const puppeteer = require('puppeteer');
const httpServer = require('http-server');
const percySnapshot = require('@percy/puppeteer');

describe('TodoMVC', function () {
  this.timeout(10000);
  let page;
  let server;
  let browser;

  //define port
  const PORT = process.env.PORT_NUMBER || 3000;

  //before tests start
  before(async () => {
    //start the server
    server = httpServer.createServer();
    server.listen(PORT);
    //start the browser and page
    browser = await puppeteer.launch({
      headless:true,
      slowMo:0
    });
    page = await browser.newPage();
  });

  //after all tests are finished
  after(async function()  {
    //close browser
    await browser.close();
    //close server
    await server.close();
  });

  //do test
  it('Loads the app', async function () {
    //go to test page
    await page.goto(`http://localhost:${PORT}/docs/#p/cheatsheet`);
      //wait for element to load
      await page.waitForSelector('h1');
      //get snapshot
      await percySnapshot(page, "Snapshot1",{ widths: [375, 767, 1280] });
  });
});