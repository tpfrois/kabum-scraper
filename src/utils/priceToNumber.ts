const priceToNumber = (price: string) => {
  !!price && 0;

  price = price.split(".").join("");
  price = price.split(",").join(".");
  return Number(price.replace(/[^0-9.]/g, ""));
}

export default priceToNumber;