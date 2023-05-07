import { useSelector } from "react-redux";
import { selectUserWishlist } from "../store/user/user.selector";
import { useEffect, useState } from "react";

const useIsInWishList = (tourId: string | undefined) => {
  const wishlist = useSelector(selectUserWishlist);
  const [inWishList, setInWishList] = useState<boolean>(false);

  useEffect(() => {
    if (!tourId) return;
    const newInWishList = Boolean(
      wishlist?.find((wishedTour) => wishedTour === tourId)
    );
    setInWishList(newInWishList);
  }, [wishlist, tourId]);

  return inWishList;
};

export default useIsInWishList;
