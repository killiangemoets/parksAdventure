export const formatPrice = (price: number) => {
  const options = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  };
  const formattedprice = Number(price).toLocaleString("en", options);
  return `$ ${formattedprice}`;
};
