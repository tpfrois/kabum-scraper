import prompt from 'prompt';

const getProductName = async (): Promise<string> => {
  prompt.start();

  const { product } = await prompt.get({
    properties: {
      product: {
        description: 'What product do you want to scrape?'
      }
    }
  })

  return product;
}

export default getProductName;