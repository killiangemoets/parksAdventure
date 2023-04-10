import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTourItems } from "../../api/booking-requests";
import CartItem from "../../components/cartComponents/cartItem/cartItem.component";
import CheckoutCard from "../../components/cartComponents/checkoutCard/checkoutCard.component";
import TourRecommendations from "../../components/UIComponents/tourRecommendations/tourRecommendations.component";
import Button from "../../components/UIComponents/button/button.component";
import Spinner, {
  SPINNER_TYPE_CLASSES,
} from "../../components/UIComponents/spinner/spinner.component";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../components/UIComponents/title/title.component";
import { clearCart, removeItem } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import { AppDispatch } from "../../store/store";
import { TItemWithTourInfo } from "../../types/booking";
import { calculateBasketPrice } from "../../utils/dataManipulation/calculateTotalPrice";
import {
  CartBody,
  CartCheckout,
  CartContainer,
  CartEmpty,
  CartMessage,
  CartSpinner,
  CartWrapper,
  ItemsList,
} from "./cart.style";
import { TourData } from "../../types/tour";
import { co } from "@fullcalendar/core/internal-common";
import {
  getTopTourRecommendations,
  // getTourRecommendations,
} from "../../api/tour-requests";

const Cart = () => {
  const dispatch: AppDispatch = useDispatch();

  const items = useSelector(selectCartItems);
  const [itemsWithTourInfo, setItemsWithTourInfo] = useState<
    TItemWithTourInfo[]
  >([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [recommendations, setRecommendations] = useState<TourData[]>([]);

  // useEffect(() => {
  //   console.log({ items });
  //   const handleGetRecommendations = async () => {
  //     const notIncludedIds = items.map((item) => item.tour._id);
  //     const response = await getTourRecommendations(notIncludedIds);
  //     if (response.status === "success") {
  //       setRecommendations(response.data.data);
  //     }
  //   };
  //   handleGetRecommendations();
  // }, []);

  useEffect(() => {
    if (items.length === 0) setErrorMessage("Your cart is empty");
  }, [items]);

  const handleDeleteItem = (tourId: string) => {
    const newItemsWithTourInfo = itemsWithTourInfo.filter(
      (item) => item.tour._id !== tourId
    );
    setItemsWithTourInfo(newItemsWithTourInfo);
    // dispatch(removeItem(tourId));
  };

  return (
    <CartContainer>
      <CartWrapper>
        <Title titleType={TITLE_TYPE_CLASSES.section}>Shopping Cart</Title>
        <CartBody>
          {errorMessage && (
            <CartEmpty>
              <CartMessage>{errorMessage}</CartMessage>
              <Link to="/alltours">
                <Button>Find a tour</Button>
              </Link>
            </CartEmpty>
          )}
          {items.length > 0 && (
            <>
              <ItemsList>
                {/* {items.map((item, i) => (
                  <CartItem
                    key={i}
                    startingDate={item.startingDate}
                    kidPrice={item.kidPrice}
                    price={item.price}
                    adults={item.adults}
                    children={item.children}
                    tour={item.tour}
                    handleDelete={handleDeleteItem}
                  />
                ))} */}
              </ItemsList>
              <CartCheckout>
                <CheckoutCard
                  numberOfItems={items.length}
                  totalPrice={calculateBasketPrice(items)}
                />
              </CartCheckout>
            </>
          )}
        </CartBody>
        {recommendations.length && (
          <TourRecommendations tours={recommendations} />
        )}
      </CartWrapper>
    </CartContainer>
  );
};

export default Cart;
