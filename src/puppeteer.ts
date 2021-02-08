import puppeteer from 'puppeteer';
import cheerio from 'cheerio';

const KABUM_URL = 'https://www.kabum.com.br/cgi-local/site/listagem/listagem.cgi?string='

const getPage = async (product: string) => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  // Performance improve
  page.setRequestInterception(true);
  page.on('request', async request => {
    if (request.resourceType() === 'fetch' || request.resourceType() === 'stylesheet' || request.resourceType() === 'image' || request.resourceType() === 'media' || request.resourceType() === 'font') {
      request.abort()
    } else {
      request.continue()
    }
  });

  await page.goto(`${KABUM_URL}${product}&pagina=1&ordem=5&limite=100`);

  const content = await page.content();

  await browser.close();

  const $ = cheerio.load(content);

  return $;
}

export default getPage;