import { FC } from "react";
import { TTourItem } from "../../../types/booking";
import calculateTotalPrice from "../../../utils/dataManipulation/calculateTotalPrice";
import { niceDatesRange } from "../../../utils/formatting/formatDates";
import niceGroupDetailsString from "../../../utils/formatting/formatGroup";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../UIComponents/button/button.component";
import InfoIcon, {
  INFO_ICON_TYPE_CLASSES,
} from "../../UIComponents/infoIcon/infoIcon.component";
import StarsRating from "../../UIComponents/starsRating/starsRating.component";
import {
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
} from "./cartItem.style";

type CartItemProps = {
  tour: TTourItem;
  startingDate: Date;
  kidPrice?: number;
  price: number;
  adults: number;
  children: number;
  handleDelete: (tourId: string, startingDate: Date) => void;
};

const CartItem: FC<CartItemProps> = ({
  tour,
  startingDate,
  kidPrice,
  price,
  adults,
  children,
  handleDelete,
}) => {
  let endDate = new Date(startingDate);
  endDate.setDate(new Date(startingDate).getDate() + tour?.duration);

  return (
    <CartItemContainer>
      <CartItemPicture>
        <img src={tour.imageCover} alt="tour cover" />
      </CartItemPicture>
      <CartItemContent>
        <CartItemHeader>
          <CartItemTitle>{tour.name}</CartItemTitle>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.empty}
            onClick={() => {
              handleDelete(tour._id, startingDate);
            }}
          >
            <InfoIcon iconType={INFO_ICON_TYPE_CLASSES.close} />
          </Button>
        </CartItemHeader>
        <CartItemBody>
          <CartItemInfoList>
            <StarsRating
              rating={tour.ratingsAverage}
              numRatings={tour.ratingsQuantity}
            />
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
            <Button buttonType={BUTTON_TYPE_CLASSES.empty}>
              Change date or participant(s)
            </Button>
          </CartItemInfoList>
          <CartItemPrice>
            ${calculateTotalPrice(adults, children, price, kidPrice)}
          </CartItemPrice>
        </CartItemBody>
      </CartItemContent>
    </CartItemContainer>
  );
};

export default CartItem;
