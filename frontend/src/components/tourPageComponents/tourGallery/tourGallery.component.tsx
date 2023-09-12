import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../UIComponents/button/button.component";
import {
  HeartIcon,
  TourFourthImage,
  TourGalleryButtons,
  TourGalleryContainer,
  TourGalleryGrid,
  TourMainImage,
  TourSecondImage,
  TourThirdImage,
} from "./tourGallery.style";

import PicturesCarousel from "../../UIComponents/picturesCarousel/picturesCarousel.component";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTour,
  selectTourIsLoading,
} from "../../../store/tour/tour.selector";
import { addToWishlist, removeFromWishlist } from "../../../api/user-requests";
import { AppDispatch } from "../../../store/store";
import { updateUser } from "../../../store/user/user.action";
import useIsInWishList from "../../../hooks/useIsInWishList";
import getAuthenticationRedictionUri from "../../../utils/formatting/formatAuthenticationUri";
import { useNavigate } from "react-router-dom";
import {
  selectUserId,
  selectUserRole,
} from "../../../store/user/user.selector";
import { isUserAdminOrGuide } from "../../../utils/dataManipulation/IsUserRole";

const TourGallery = () => {
  const navigate = useNavigate();
  const userId = useSelector(selectUserId);
  const userRole = useSelector(selectUserRole);
  const dispatch: AppDispatch = useDispatch();
  const [picturesCarouselOpen, setPicturesCarouselOpen] =
    useState<boolean>(false);
  const tour = useSelector(selectTour);
  const isLoading = useSelector(selectTourIsLoading);
  const [carouselImages, setCarouselImages] = useState<string[]>([]);
  const [initialImageIndex, setInitialImageIndex] = useState<number>(0);
  const inwishlist = useIsInWishList(tour?._id);

  useEffect(() => {
    let newCarouselImages = [];
    if (tour?.imageCover) newCarouselImages.push(tour.imageCover);
    if (tour?.images) newCarouselImages.push(...tour.images);
    setCarouselImages(newCarouselImages);
  }, [tour]);

  const handleOpenCarousel = (state: boolean): void => {
    document.body.style.overflowY = state ? "hidden" : "scroll";
    setPicturesCarouselOpen(state);
  };

  const handleWishlist = async () => {
    if (!userId) {
      const uri = getAuthenticationRedictionUri(window.location.href);
      navigate(`/login?uri=${uri}`);
    }

    if (!tour?._id) return;
    const response = inwishlist
      ? await removeFromWishlist(tour?._id)
      : await addToWishlist(tour?._id);

    if (response && response.status === "success") {
      const { wishlist } = response.data.user;
      dispatch(
        updateUser({
          wishlist,
        })
      );
    }
  };

  return (
    <>
      <TourGalleryContainer>
        <TourGalleryGrid>
          <TourMainImage
            onClick={() => {
              setInitialImageIndex(0);
              handleOpenCarousel(true);
            }}>
            {!isLoading && tour?.imageCover && (
              <img src={tour?.imageCover} alt="Tour 1" />
            )}
          </TourMainImage>
          <TourSecondImage
            onClick={() => {
              setInitialImageIndex(1);
              handleOpenCarousel(true);
            }}>
            {!isLoading && tour?.images && tour?.images[0] && (
              <img src={tour.images[0]} alt="Tour 2" />
            )}
          </TourSecondImage>
          <TourThirdImage
            onClick={() => {
              setInitialImageIndex(2);
              handleOpenCarousel(true);
            }}>
            {!isLoading && tour?.images && tour?.images[1] && (
              <img src={tour.images[1]} alt="Tour 3" />
            )}
          </TourThirdImage>
          <TourFourthImage
            onClick={() => {
              setInitialImageIndex(4);
              handleOpenCarousel(true);
            }}>
            {!isLoading && tour?.images && tour?.images[2] && (
              <img src={tour.images[2]} alt="Tour 4" />
            )}
          </TourFourthImage>
          <TourGalleryButtons>
            <Button
              buttonType={BUTTON_TYPE_CLASSES.gallery}
              onClick={() => {
                setInitialImageIndex(0);
                handleOpenCarousel(true);
              }}>
              View all {carouselImages.length} images
            </Button>
            {!isUserAdminOrGuide(userRole) && (
              <Button
                buttonType={BUTTON_TYPE_CLASSES.gallery}
                onClick={handleWishlist}>
                {inwishlist ? "Added to whishlist" : "Add to wishlist"}{" "}
                <HeartIcon inwishlist={inwishlist} />
              </Button>
            )}
          </TourGalleryButtons>
        </TourGalleryGrid>
      </TourGalleryContainer>
      {picturesCarouselOpen && (
        <PicturesCarousel
          handleOpen={handleOpenCarousel}
          images={carouselImages}
          initialImageIndex={initialImageIndex}
        />
      )}
    </>
  );
};

export default TourGallery;
