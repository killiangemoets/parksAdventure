import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useDatesFromAvailabilities from "../../../hooks/datesFromAvailabilities";
import useLabelFromGroupInfo from "../../../hooks/labelFromGroupInfo";
import { removeItem, updateItem } from "../../../store/cart/cart.action";
import { selectCartItems } from "../../../store/cart/cart.selector";
import { AppDispatch } from "../../../store/store";
import { TTourItem } from "../../../types/booking";
import { TAvailability } from "../../../types/tour";
import compareDates from "../../../utils/comparison/compareDates";
import calculateTotalPrice from "../../../utils/dataManipulation/calculateTotalPrice";
import { niceDatesRange } from "../../../utils/formatting/formatDates";
import niceGroupDetailsString from "../../../utils/formatting/formatGroup";
import { defaultCountInputs } from "../../tourPageComponents/tourBooking/tourBooking.component";
import {
  GroupIcon,
  SelectDateFooter,
  SelectDateFooterText,
  SelectDateFooterText2,
} from "../../tourPageComponents/tourBooking/tourBookingInputs.style";
import Alert from "../../UIComponents/alert/alert.component";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../UIComponents/button/button.component";
import DateInput from "../../UIComponents/dateInput/dateInput.component";
import Dropdown, {
  DROPDOWN_TYPE_CLASSES,
} from "../../UIComponents/dropdown/dropdown.component";
import { CountInputState } from "../../UIComponents/dropdown/dropdownCounts.component";
import InfoIcon, {
  INFO_ICON_TYPE_CLASSES,
} from "../../UIComponents/infoIcon/infoIcon.component";
import StarsRating from "../../UIComponents/starsRating/starsRating.component";
import {
  CartItemInputs,
  CartItemBody,
  CartItemContainer,
  CartItemContent,
  CartItemHeader,
  CartItemInfo,
  CartItemInfoList,
  CartItemInfoText,
  CartItemPicture,
  CartItemPrice,
  CartItemTitle,
  Rebook,
  CartItemEditButton,
} from "./cartItem.style";
import { Link } from "react-router-dom";
import getEndDate from "../../../utils/dataManipulation/getEndDate";

type CartItemCommonProps = {
  tour: TTourItem;
  editable?: boolean;
  startingDate: Date;
  adults: number;
  children: number;
};
type CartItemConditionalProps =
  | {
      soldout?: false;
      kidPrice?: number;
      price: number;
    }
  | {
      soldout: true;
      kidPrice?: never;
      price?: never;
    };

const CartItem: FC<CartItemCommonProps & CartItemConditionalProps> = ({
  soldout = false,
  editable = true,
  tour,
  startingDate,
  kidPrice,
  price,
  adults,
  children,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const availabilities = tour.currentAvailabilities;
  const endDate = getEndDate(startingDate, tour.duration);

  const [editing, setEditing] = useState<boolean>(false);

  const [currentCountInputs, setCurrentCountInputs] =
    useState<CountInputState[]>(defaultCountInputs);
  const [selectedAvailability, setSelectedAvailability] = useState<
    TAvailability | undefined
  >(undefined);

  const [alertMessage, setAlertMessage] = useState<string | undefined>(
    undefined
  );

  const [groupError, setGroupError] = useState<boolean>(false);
  const [dateError, setDateError] = useState<boolean>(false);

  const { availableDates, cheapestDates, lastSpotsDates } =
    useDatesFromAvailabilities({ availabilities });

  const { label } = useLabelFromGroupInfo({ group: currentCountInputs });

  useEffect(() => {
    if (soldout) return;
    const newAvailability = availabilities.find((availability) =>
      compareDates(availability.date, startingDate)
    );
    setSelectedAvailability(newAvailability);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startingDate]);

  useEffect(() => {
    if (soldout) return;
    const newCountInputs = [
      { ...currentCountInputs[0], value: adults },
      { ...currentCountInputs[1], value: children },
    ];
    setCurrentCountInputs(newCountInputs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adults, children]);

  const handleEditItem = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    groupError && setGroupError(false);
    dateError && setDateError(false);
    setEditing(false);
    if (soldout) return;
    const newCountInputs = [
      { ...currentCountInputs[0], value: adults },
      { ...currentCountInputs[1], value: children },
    ];
    setCurrentCountInputs(newCountInputs);
    const newAvailability = availabilities.find((availability) =>
      compareDates(availability.date, startingDate)
    );
    setSelectedAvailability(newAvailability);
  };

  const handleSave = () => {
    if (currentCountInputs[0].value === 0 && currentCountInputs[1].value === 0)
      setGroupError(true);
    if (!selectedAvailability) setDateError(true);

    if (
      !selectedAvailability?.date ||
      (!currentCountInputs[0].value && !currentCountInputs[1].value)
    )
      return;

    setEditing(false);
    dispatch(
      updateItem(tour._id, startingDate, {
        startingDate: selectedAvailability.date,
        adults: currentCountInputs[0].value,
        children: currentCountInputs[1].value,
      })
    );
  };

  const handleDelete = () => {
    dispatch(removeItem(tour._id, startingDate));
  };

  const handleChangeGroup = (newGroup: CountInputState[]): void => {
    groupError && setGroupError(false);

    const currentCartItem =
      selectedAvailability &&
      !compareDates(selectedAvailability.date, startingDate)
        ? cartItems.find((item) =>
            compareDates(item.startingDate, selectedAvailability?.date)
          )
        : undefined;

    const spotsLeft = selectedAvailability
      ? selectedAvailability.maxGroupSize -
        selectedAvailability.currentGroupSize -
        (currentCartItem
          ? currentCartItem.adults + currentCartItem.children
          : 0)
      : 0;
    if (
      (selectedAvailability &&
        newGroup[0].value + newGroup[1].value > spotsLeft) ||
      (tour &&
        newGroup[0].value + newGroup[1].value > tour?.maxGroupSizeCapacity)
    ) {
      const spotsString = spotsLeft > 1 ? "spots" : "spot";
      setAlertMessage(
        tour &&
          newGroup[0].value + newGroup[1].value > tour?.maxGroupSizeCapacity
          ? `The maximum group size for this tour is ${tour?.maxGroupSizeCapacity} people`
          : spotsLeft
          ? `There is only ${spotsLeft} ${spotsString} left for this date`
          : "There is no spot left for this date"
      );
      setTimeout(function () {
        setAlertMessage(undefined);
      }, 4000);
    } else {
      setCurrentCountInputs(newGroup);
    }
  };

  const handleChangeDate = (date: Date | null) => {
    dateError && setDateError(false);

    if (availabilities && date) {
      const newAvailability = availabilities.find((availability) =>
        compareDates(availability.date, date)
      );
      setSelectedAvailability(newAvailability);

      const currentCartItem =
        newAvailability && !compareDates(date, startingDate)
          ? cartItems.find((item) =>
              compareDates(item.startingDate, newAvailability?.date)
            )
          : undefined;

      const spotsLeft = newAvailability
        ? newAvailability.maxGroupSize -
          newAvailability.currentGroupSize -
          (currentCartItem
            ? currentCartItem.adults + currentCartItem.children
            : 0)
        : 0;

      if (
        newAvailability &&
        currentCountInputs[0].value + currentCountInputs[1].value > spotsLeft
      ) {
        const spotsString = spotsLeft > 1 ? "spots" : "spot";
        setAlertMessage(
          spotsLeft
            ? `There is only ${spotsLeft} ${spotsString} left for this date`
            : "There is no spot left for this date"
        );
        setTimeout(function () {
          setAlertMessage(undefined);
        }, 4000);
        setCurrentCountInputs(defaultCountInputs);
      }
    } else {
      setSelectedAvailability(undefined);
    }
  };

  return (
    <>
      <CartItemContainer>
        <Link to={`/tour/${tour.slug}`} style={{ height: "fit-content" }}>
          <CartItemPicture>
            <img src={tour.imageCover} alt="tour cover" />
          </CartItemPicture>
        </Link>
        <CartItemContent>
          <CartItemHeader>
            <Link to={`/tour/${tour.slug}`} style={{ height: "fit-content" }}>
              <CartItemTitle>{tour.name}</CartItemTitle>
            </Link>
            {editable && (
              <Button
                buttonType={BUTTON_TYPE_CLASSES.empty}
                onClick={() => {
                  handleDelete();
                }}>
                <InfoIcon iconType={INFO_ICON_TYPE_CLASSES.close} />
              </Button>
            )}
          </CartItemHeader>
          <CartItemBody>
            <CartItemInfoList>
              <StarsRating
                rating={tour.ratingsAverage}
                numRatings={tour.ratingsQuantity}
              />
              {!editing ? (
                <>
                  <CartItemInfo>
                    <InfoIcon iconType={INFO_ICON_TYPE_CLASSES.group} />
                    <CartItemInfoText>
                      {niceGroupDetailsString(adults, children)}
                    </CartItemInfoText>
                  </CartItemInfo>
                  <CartItemInfo>
                    <InfoIcon iconType={INFO_ICON_TYPE_CLASSES.date} />
                    <CartItemInfoText>
                      {niceDatesRange(startingDate, endDate)}
                    </CartItemInfoText>
                  </CartItemInfo>
                  {editable && (
                    <Button
                      buttonType={BUTTON_TYPE_CLASSES.empty}
                      onClick={() => {
                        handleEditItem();
                      }}>
                      {!soldout ? (
                        "Change date or participant(s)"
                      ) : (
                        <Rebook>Make a new reservation for this tour</Rebook>
                      )}
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <CartItemInputs>
                    <Dropdown
                      dropdownType={DROPDOWN_TYPE_CLASSES.count}
                      buttonType={BUTTON_TYPE_CLASSES.light}
                      countInputsState={currentCountInputs}
                      handleCount={handleChangeGroup}
                      error={groupError}>
                      <>
                        <GroupIcon />
                        <p>{label}</p>
                      </>
                    </Dropdown>
                    <DateInput
                      currentValue={selectedAvailability?.date || null}
                      handleChange={(value) => {
                        handleChangeDate(value);
                      }}
                      enabledDates={availableDates}
                      highlightDates={cheapestDates}
                      highlightDates2={lastSpotsDates}
                      footer={
                        <SelectDateFooter>
                          <SelectDateFooterText>
                            Cheapest date(s)
                          </SelectDateFooterText>
                          <SelectDateFooterText2>
                            5 or less spots left
                          </SelectDateFooterText2>
                        </SelectDateFooter>
                      }
                      error={dateError}
                    />
                  </CartItemInputs>
                  <CartItemEditButton>
                    <Button
                      buttonType={BUTTON_TYPE_CLASSES.empty}
                      onClick={() => {
                        handleCancel();
                      }}>
                      <Rebook>Cancel</Rebook>
                    </Button>
                    <Button
                      buttonType={BUTTON_TYPE_CLASSES.empty}
                      onClick={() => {
                        handleSave();
                      }}>
                      <Rebook>Save</Rebook>
                    </Button>
                  </CartItemEditButton>
                </>
              )}
            </CartItemInfoList>
            {!soldout && price && (
              <CartItemPrice>
                ${calculateTotalPrice(adults, children, price, kidPrice)}
              </CartItemPrice>
            )}
          </CartItemBody>
        </CartItemContent>
      </CartItemContainer>
      {alertMessage && <Alert>{alertMessage}</Alert>}
    </>
  );
};

export default CartItem;
