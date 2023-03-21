import Pagination from "../../components/UIComponents/pagination/pagination.component";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../components/UIComponents/title/title.component";
import TourCard from "../../components/UIComponents/tourCard/tourCard.component";
import { UserWishListContainer, WishListCards } from "./userWishList.style";

export const UserWishList = () => {
  return (
    <UserWishListContainer>
      <Title titleType={TITLE_TYPE_CLASSES.section}>My Wishlist</Title>
      <WishListCards>
        {/* <TourCard />
        <TourCard />
        <TourCard />
        <TourCard />
        <TourCard /> */}
      </WishListCards>
      <Pagination
        current={1}
        total={32}
        defaultPageSize={16}
        handleChange={(value) => {}}
      />
    </UserWishListContainer>
  );
};

export default UserWishList;
