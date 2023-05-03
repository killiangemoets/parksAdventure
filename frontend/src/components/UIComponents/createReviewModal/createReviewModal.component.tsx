import { ChangeEvent, FC, useEffect, useState } from "react";
import Modal from "../modal/modal.component";
import StarsRating from "../starsRating/starsRating.component";
import {
  ReviewInput,
  ReviewModalButtons,
  ReviewModalWrapper,
} from "../review/review.style";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import FormButton from "../formButton/formButton.component";
import { ErrorMessage } from "../../authenticationComponents/authentication.style";
import { PROFILE_PICTURE_SIZE_CLASSES } from "../profilePicture/profilePicture.component";
import { StarsRatingContainer } from "./createReviewModal.style";
import {
  createReview,
  editMyReview,
  getMyReviews,
} from "../../../api/review-requests";
import Spinner, { SPINNER_TYPE_CLASSES } from "../spinner/spinner.component";
import ReviewProfile from "../reviewProfile/reviewProfile.component";
import ReviewModal from "../reviewModal/reviewModal.component";

export type CreateReviewModalProps = {
  tourId: string;
  tourImg: string;
  tourName: string;
  tourLink: string;
  open: boolean;
  handleClose: () => void;
};

const CreateReviewModal: FC<CreateReviewModalProps> = ({
  tourId,
  tourImg,
  tourName,
  tourLink,
  open,
  handleClose,
}) => {
  const [isSaveLoading, setIsSaveLoading] = useState<boolean>(false);
  const [isGetReviewLoading, setIsGetReviewLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [existingReview, setExistingReview] = useState<string | undefined>(
    undefined
  );

  const [review, setReview] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [isRatingMissing, setIsRatingMissing] = useState<boolean>(false);

  useEffect(() => {
    if (!open) return;
    const handleGetReview = async () => {
      if (!tourId) return;
      setIsGetReviewLoading(true);
      const response = await getMyReviews(tourId);
      if (
        response &&
        response.status === "success" &&
        response.data.data.length
      ) {
        setReview(response.data.data[0].review);
        setRating(response.data.data[0].rating);
        setExistingReview(response.data.data[0].id);
      }
      setIsGetReviewLoading(false);
    };
    handleGetReview();
  }, [tourId, open]);

  const handleCloseReviewModal = () => {
    setErrorMessage(undefined);
    setIsRatingMissing(false);
    setReview("");
    setRating(0);
    handleClose();
  };

  const handleChangeReview = (newReview: string) => {
    setErrorMessage(undefined);
    setIsRatingMissing(false);
    if (newReview.length >= 500) return;
    setReview(newReview);
  };

  const handleChangeRating = (newRating: number) => {
    setErrorMessage(undefined);
    setIsRatingMissing(false);
    setRating(newRating);
  };

  const handlCreateSave = async () => {
    setErrorMessage(undefined);
    setIsRatingMissing(false);
    if (!rating) {
      setIsRatingMissing(true);
      setErrorMessage("Please provide a rating");
      return;
    }

    setIsSaveLoading(true);
    setIsSaveLoading(true);
    let response;
    if (existingReview)
      response = await editMyReview(existingReview, rating, review);
    else response = await createReview(tourId, rating, review);
    setIsSaveLoading(false);
    setIsSaveLoading(false);
    if (response && response.status === "success") {
      setSuccess(true);
      setTimeout(function () {
        setSuccess(false);
        handleClose();
      }, 1000);
    } else {
      if (
        response.message.includes(
          "Reviews can only be left once the activity is completed"
        )
      )
        setErrorMessage(response.message);
      else if (response.message.includes("E11000 duplicate key")) {
        setErrorMessage("You can only give one review by tour");
      } else setErrorMessage('"An error occured. Please try again!"');
    }
  };

  return (
    <ReviewModal
      type={"create"}
      handleCloseModal={handleCloseReviewModal}
      open={open}
      tourImg={tourImg}
      tourName={tourName}
      tourLink={tourLink}
      isGetReviewLoading={isGetReviewLoading}
      isRatingMissing={isRatingMissing}
      handleChangeRating={handleChangeRating}
      rating={rating}
      handleChangeReview={handleChangeReview}
      review={review}
      isSaveLoading={isSaveLoading}
      success={success}
      handleSave={handlCreateSave}
      errorMessage={errorMessage}
    />
  );
};

export default CreateReviewModal;
