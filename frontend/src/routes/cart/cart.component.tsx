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
import { TItemWithTourInfo, TSoldOutItem } from "../../types/booking";
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
import { getTopTourRecommendations } from "../../api/tour-requests";
import { TTourItem } from "../../types/booking";
import compareDates from "../../utils/comparison/compareDates";

const Cart = () => {
  const dispatch: AppDispatch = useDispatch();

  const items = useSelector(selectCartItems);
  const [itemsWithTourInfo, setItemsWithTourInfo] = useState<
    TItemWithTourInfo[]
  >([]);
  const [soldoutItems, setSoldoutItems] = useState<TSoldOutItem[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recommendations, setRecommendations] = useState<TourData[]>([]);

  useEffect(() => {
    const handleGetTourItems = async () => {
      setIsLoading(true);
      const tourIds = items.map((item) => item.tourId);
      const response = await getTourItems(tourIds);
      if (response.status === "success") {
        const toursList: TTourItem[] = response.data.data;
        const newItemsWithTourInfo: TItemWithTourInfo[] = [];
        const newSoldOutItems: TSoldOutItem[] = [];

        items.forEach((item) => {
          const tour = toursList.find((tour) => tour._id === item.tourId);
          if (!tour) return;
          const selectedAvailability = tour.currentAvailabilities.find(
            (availability) => {
              return compareDates(availability.date, item.startingDate);
            }
          );
          console.log({ tour, item, selectedAvailability });
          if (
            !selectedAvailability ||
            item.adults + item.children >
              selectedAvailability?.maxGroupSize -
                selectedAvailability?.currentGroupSize
          ) {
            dispatch(removeItem(item.tourId, item.startingDate));
            newSoldOutItems.push({
              ...item,
              availableGroupCapacity: selectedAvailability
                ? selectedAvailability?.maxGroupSize -
                  selectedAvailability?.currentGroupSize
                : 0,
            });
          } else {
            newItemsWithTourInfo.push({
              ...item,
              tour,
            });
          }
        });

        console.log({ newItemsWithTourInfo, newSoldOutItems });
        setItemsWithTourInfo(newItemsWithTourInfo);
        setSoldoutItems(newSoldOutItems);
        setRecommendations(response.recommendations);
      } else {
        setErrorMessage("An error occured. Please try again!");
      }
      setIsLoading(false);
    };

    const handleGetTopRecommendations = async () => {
      setIsLoading(true);
      const response = await getTopTourRecommendations();
      if (response.status === "success") {
        setRecommendations(response.data.data);
      }
      setIsLoading(false);
    };

    if (items.length > itemsWithTourInfo.length) {
      console.log("handleGetTourItems");
      handleGetTourItems();
    }
    if (!recommendations.length && !items.length) {
      console.log("handleGetTopRecommendations");
      handleGetTopRecommendations();
    }
    if (items.length === 0) setErrorMessage("Your cart is empty");
  }, [items]);

  const handleDeleteItem = (tourId: string, startingDate: Date) => {
    const newItemsWithTourInfo = itemsWithTourInfo.filter(
      (item) =>
        !(
          item.tour._id === tourId &&
          compareDates(item.startingDate, startingDate)
        )
    );

    console.log(newItemsWithTourInfo);
    setItemsWithTourInfo(newItemsWithTourInfo);
    dispatch(removeItem(tourId, startingDate));
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
          {isLoading ? (
            <CartSpinner>
              <Spinner spinnerType={SPINNER_TYPE_CLASSES.large} />
            </CartSpinner>
          ) : (
            itemsWithTourInfo.length > 0 && (
              <>
                <ItemsList>
                  {itemsWithTourInfo.map((item, i) => (
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
                  ))}
                </ItemsList>
                <CartCheckout>
                  <CheckoutCard
                    numberOfItems={itemsWithTourInfo.length}
                    totalPrice={calculateBasketPrice(itemsWithTourInfo)}
                  />
                </CartCheckout>
              </>
            )
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
