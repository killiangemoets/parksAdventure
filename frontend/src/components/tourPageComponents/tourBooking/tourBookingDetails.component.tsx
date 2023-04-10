import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../../store/cart/cart.action";
import { AppDispatch } from "../../../store/store";
import {
  selectTour,
  selectTourIsLoading,
} from "../../../store/tour/tour.selector";
import { TItem, TItemWithTourInfo } from "../../../types/booking";
import { TAvailability } from "../../../types/tour";
import calculateTotalPrice from "../../../utils/dataManipulation/calculateTotalPrice";
import {
  niceDatesRange,
  niceMonth,
} from "../../../utils/formatting/formatDates";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../UIComponents/button/button.component";
import { CountInputState } from "../../UIComponents/dropdown/dropdownCounts.component";
import InfoIcon, {
  INFO_ICON_TYPE_CLASSES,
} from "../../UIComponents/infoIcon/infoIcon.component";
import {
  Info,
  InfoContent,
  InfoLink,
  InfoPrice,
  InfoPriceContent,
  InfoPriceName,
  InfoPrices,
  InfoTitle,
  TotalPrice,
  TotalPriceTitle,
  TourBookingButtons,
  TourBookingDetailsContainer,
  TourBookingFooter,
  TourBookingInfo,
  TourBookingTitle,
  TourBookingTotal,
} from "./tourBookingDetails.style";

type TourBookingDetailsProps = {
  availability: TAvailability;
  group: CountInputState[];
};

const TourBookingDetails: FC<TourBookingDetailsProps> = ({
  availability,
  group,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const tour = useSelector(selectTour);
  const isLoading = useSelector(selectTourIsLoading);
  const [endDate, setEndDate] = useState<Date>(new Date(Date.now()));

  useEffect(() => {
    if (tour && availability) {
      let newEndDate = new Date(availability?.date);
      newEndDate.setDate(
        new Date(availability.date).getDate() + tour?.duration
      );
      setEndDate(newEndDate);
    }
  }, [tour, availability]);

  const handleAddToCart = () => {
    if (!tour) return;
    const newItem: TItem = {
      tourId: tour._id,
      startingDate: availability.date,
      kidPrice: availability.kidPrice,
      price: availability.price,
      adults: group[0].value,
      children: group[1].value,
    };
    console.log({ newItem });
    dispatch(addItem(newItem));
  };

  return (
    <TourBookingDetailsContainer>
      {!isLoading && availability && (
        <>
          <TourBookingTitle>{tour && tour.name}</TourBookingTitle>
          <TourBookingInfo>
            <Info>
              <InfoIcon iconType={INFO_ICON_TYPE_CLASSES.time} />
              <InfoTitle>Starting Time</InfoTitle>
              <InfoContent>
                {`${niceMonth(availability.date)} ${new Date(
                  availability.date
                ).getDate()} at `}
                <span>9.00 am</span>
              </InfoContent>
            </Info>
            <Info>
              <InfoIcon iconType={INFO_ICON_TYPE_CLASSES.location} />
              <InfoTitle>Address</InfoTitle>
              <InfoLink to="https://www.google.com">
                {tour?.meetingAddress}
              </InfoLink>
            </Info>
          </TourBookingInfo>
          <TourBookingInfo>
            {tour?.additionalInfo?.map((info) => (
              <Info>
                <InfoIcon iconType={INFO_ICON_TYPE_CLASSES.bullet} />
                <InfoContent>{info}</InfoContent>
              </Info>
            ))}
          </TourBookingInfo>
          <TourBookingInfo>
            <Info>
              <InfoIcon iconType={INFO_ICON_TYPE_CLASSES.date} />
              <InfoContent>
                {niceDatesRange(availability.date, endDate)}
              </InfoContent>
            </Info>
            <InfoPrices>
              {group[0].value > 0 && (
                <Info>
                  <InfoIcon iconType={INFO_ICON_TYPE_CLASSES.group} />
                  <InfoPriceName>Adult</InfoPriceName>
                  <InfoPriceContent>{`${group[0].value} x $${availability.price}`}</InfoPriceContent>
                  <InfoPrice>${group[0].value * availability.price}</InfoPrice>
                </Info>
              )}
              {group[1].value > 0 && (
                <Info>
                  <InfoIcon
                    iconType={
                      group[0].value > 0
                        ? INFO_ICON_TYPE_CLASSES.empty
                        : INFO_ICON_TYPE_CLASSES.group
                    }
                  />
                  <InfoPriceName>Child</InfoPriceName>
                  <InfoPriceContent>{`${group[1].value} x $${availability.kidPrice}`}</InfoPriceContent>
                  <InfoPrice>
                    $
                    {group[1].value *
                      (availability.kidPrice || availability.price)}
                  </InfoPrice>
                </Info>
              )}
            </InfoPrices>
          </TourBookingInfo>
          <TourBookingFooter>
            <TourBookingTotal>
              <TotalPriceTitle>Total Price</TotalPriceTitle>
              <TotalPrice>
                $
                {calculateTotalPrice(
                  group[0].value,
                  group[1].value,
                  availability.price,
                  availability.kidPrice
                )}
              </TotalPrice>
            </TourBookingTotal>
            <TourBookingButtons>
              <Button buttonType={BUTTON_TYPE_CLASSES.cancel}>Book now</Button>
              <Button
                onClick={() => {
                  handleAddToCart();
                }}
              >
                Add to cart
              </Button>
            </TourBookingButtons>
          </TourBookingFooter>
        </>
      )}
    </TourBookingDetailsContainer>
  );
};

export default TourBookingDetails;
