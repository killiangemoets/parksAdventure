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
import { StarsRatingContainer } from "./reviewModal.style";
import Spinner, { SPINNER_TYPE_CLASSES } from "../spinner/spinner.component";
import ReviewProfile from "../reviewProfile/reviewProfile.component";

export type CreateReviewModalProps = {
  type: "create" | "edit";
  handleCloseModal: () => void;
  open: boolean;
  tourImg?: string;
  tourName: string;
  tourLink: string;
  isGetReviewLoading?: boolean;
  isRatingMissing?: boolean;
  handleChangeRating: (newRating: number) => void;
  rating: number;
  handleChangeReview: (newReview: string) => void;
  review: string;
  isSaveLoading: boolean;
  success: boolean;
  handleSave: () => void;
  errorMessage?: string;
};

const ReviewModal: FC<CreateReviewModalProps> = ({
  type,
  handleCloseModal,
  open,
  tourImg,
  tourName,
  tourLink,
  isGetReviewLoading = false,
  isRatingMissing = false,
  rating,
  handleChangeRating,
  handleChangeReview,
  review,
  isSaveLoading,
  success,
  handleSave,
  errorMessage,
}) => {
  const handleUpdateReview = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value: newReview } = event.target;
    handleChangeReview(newReview);
  };

  return (
    <Modal
      title={type === "create" ? "Create review" : "Edit review"}
      handleClose={handleCloseModal}
      open={open}
      closeOnClickOnOverlay={false}>
      <ReviewModalWrapper>
        <ReviewProfile
          userImg={tourImg}
          userName={tourName}
          link={tourLink}
          pictureSize={PROFILE_PICTURE_SIZE_CLASSES.medium}
        />
        {isGetReviewLoading ? (
          <Spinner spinnerType={SPINNER_TYPE_CLASSES.large} />
        ) : (
          <>
            <StarsRatingContainer error={isRatingMissing}>
              <StarsRating
                hiddenValue={false}
                rating={rating}
                readonly={false}
                handleChangeRating={handleChangeRating}
              />
            </StarsRatingContainer>
            <ReviewInput
              onChange={handleUpdateReview}
              name="review"
              value={review}
              placeholder="Write a review (optional)"
            />
          </>
        )}
        <ReviewModalButtons>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.cancel}
            onClick={handleCloseModal}>
            Cancel
          </Button>
          <FormButton
            loading={isSaveLoading}
            success={success}
            handleClick={handleSave}>
            Save
          </FormButton>
        </ReviewModalButtons>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </ReviewModalWrapper>
    </Modal>
  );
};

export default ReviewModal;
