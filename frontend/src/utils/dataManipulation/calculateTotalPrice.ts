import { TItem, TItemWithTourInfo } from "../../types/booking";

const calculateTotalPrice = (
  adults: number,
  children: number,
  price: number,
  childPrice: number | undefined
) => {
  return adults * price + children * (childPrice || price);
};

export default calculateTotalPrice;

export const calculateBasketPrice = (items: TItemWithTourInfo[]) => {
  return items.reduce((sum, item) => {
    return (
      sum +
      calculateTotalPrice(item.adults, item.children, item.price, item.kidPrice)
    );
  }, 0);
};
