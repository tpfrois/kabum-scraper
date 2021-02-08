import getProductName from './prompt';
import getPage from './puppeteer';
import priceToNumber from './utils/priceToNumber';

const AVAILABLE_IMAGE = 'https://static.kabum.com.br/conteudo/temas/001/imagens/listagem/icone_disponivel.gif';

const start = async () => {
  const product = await getProductName();
  const $ = await getPage(product);

  const products = [];

  const productsList = $('.item-nome').parent().parent()

  productsList.each(function () {
    const name = $(this).find('.item-nome').text();
    const productURL = $(this).find('.item-nome').attr('href');

    const stockImage = $(this).find('img[alt*="tag de disponibilidade"]').attr('src');
    const stock = stockImage === AVAILABLE_IMAGE ? 'In stock' : 'Out of stock';

    const prices = { parcelado: 0, boleto: 0 }

    const pricesContainer = $(this).find('div > div:contains("R$") ~ div:contains("R$")').parent().children();
    const pricesLength = pricesContainer.length;

    pricesContainer.each(function (index) {
      // A KaBum possui uma forma de desconto que mostra De R$ por R$, logo é necessário incrementar +1 na posição do elemento
      const pricePositionFix = pricesLength === 4 ? 0 : 1;
      if (index === 0 + pricePositionFix) prices.parcelado = priceToNumber($(this).text());
      if (index === 2 + pricePositionFix) prices.boleto = priceToNumber($(this).text());
    })

    products.push({ name, productURL, stock, prices })
  });

  console.log(products);
}

start();