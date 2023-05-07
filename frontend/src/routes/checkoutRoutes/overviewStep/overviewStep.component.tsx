import { useSelector } from "react-redux";
import { selectCartItems } from "../../../store/cart/cart.selector";
import CartItem from "../../../components/cartComponents/cartItem/cartItem.component";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../../components/UIComponents/title/title.component";
import OrderSummary from "../../../components/checkoutPagesComponents/overviewSummary/orderSummary.component";
import {
  CartContainer,
  OverviewStepContainer,
  OverviewStepLeft,
  OverviewStepRight,
  OverviewStepSection,
} from "./overviewStep.style";
import PersonalDetails from "../../../components/checkoutPagesComponents/personalDetails/personalDetails.component";
import { useEffect, useState } from "react";
import { getTourItems } from "../../../api/booking-requests";
import { TItemWithTourInfo, TTourItem } from "../../../types/booking";
import compareDates from "../../../utils/comparison/compareDates";
import { Link, useNavigate } from "react-router-dom";
import Spinner, {
  SPINNER_TYPE_CLASSES,
} from "../../../components/UIComponents/spinner/spinner.component";
import Button from "../../../components/UIComponents/button/button.component";
import { CartEmpty, CartMessage } from "../../cart/cart.style";

const OverviewStep = () => {
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [itemsWithTourInfo, setItemsWithTourInfo] = useState<
    TItemWithTourInfo[]
  >([]);

  useEffect(() => {
    const handleGetTourItems = async () => {
      setIsLoading(true);
      const tourIds = items.map((item) => item.tourId);
      const response = await getTourItems(tourIds);
      if (response.status === "success") {
        const toursList: TTourItem[] = response.data.data;
        const newItemsWithTourInfo: TItemWithTourInfo[] = [];

        items.forEach((item) => {
          const tour = toursList.find((tour) => tour._id === item.tourId);
          if (!tour) return;
          const selectedAvailability = tour.currentAvailabilities.find(
            (availability) => {
              return compareDates(availability.date, item.startingDate);
            }
          );

          // a tour can be soldout in 3 different cases:
          // - the availibility has been removed (by admin or guide)
          // - the group is full
          // - the date has passed
          if (
            !(
              !selectedAvailability ||
              item.adults + item.children >
                selectedAvailability?.maxGroupSize -
                  selectedAvailability?.currentGroupSize ||
              new Date(selectedAvailability.date) < new Date(Date.now())
            )
          ) {
            newItemsWithTourInfo.push({
              ...item,
              tour,
              kidPrice: selectedAvailability.kidPrice,
              price: selectedAvailability.price,
            });
          }
        });

        if (!newItemsWithTourInfo.length) navigate("/cart");

        setItemsWithTourInfo(newItemsWithTourInfo);
        console.log({ newItemsWithTourInfo });
      } else {
        setErrorMessage(
          "An error occured. Please refresh the page or go back to the cart"
        );
      }
      setIsLoading(false);
    };

    if (items.length) {
      handleGetTourItems();
    }
    if (!items.length) {
      navigate("/cart");
    }
  }, [items]);

  return (
    <OverviewStepContainer>
      {isLoading ? (
        <Spinner spinnerType={SPINNER_TYPE_CLASSES.large} />
      ) : errorMessage ? (
        <CartEmpty>
          <CartMessage>{errorMessage}</CartMessage>
          <Link to="/cart">
            <Button>Go back to cart</Button>
          </Link>
        </CartEmpty>
      ) : (
        <>
          <OverviewStepLeft>
            <OverviewStepSection>
              <Title titleType={TITLE_TYPE_CLASSES.section}>
                Check your personal details
              </Title>
              <PersonalDetails />
            </OverviewStepSection>
            <OverviewStepSection>
              <Title titleType={TITLE_TYPE_CLASSES.section}>
                Check your cart
              </Title>
              <CartContainer>
                {itemsWithTourInfo.map((item, i) => (
                  <CartItem
                    key={i}
                    startingDate={item.startingDate}
                    kidPrice={item.kidPrice}
                    price={item.price}
                    adults={item.adults}
                    children={item.children}
                    tour={item.tour}
                    // editable={false}
                  />
                ))}
              </CartContainer>
            </OverviewStepSection>
          </OverviewStepLeft>
          <OverviewStepRight>
            <OverviewStepSection>
              <Title titleType={TITLE_TYPE_CLASSES.section}>
                Order summary
              </Title>
              <OrderSummary items={itemsWithTourInfo} />
            </OverviewStepSection>
          </OverviewStepRight>
        </>
      )}
    </OverviewStepContainer>
  );
};

export default OverviewStep;
