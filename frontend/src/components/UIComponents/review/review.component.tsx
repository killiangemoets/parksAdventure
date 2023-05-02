import StarsRating from "../starsRating/starsRating.component";
import { PROFILE_PICTURE_SIZE_CLASSES } from "../profilePicture/profilePicture.component";
import {
  DeleteReviewMessage,
  EditButtons,
  ReviewContainer,
  ReviewContent,
  ReviewDate,
  ReviewInfos,
  ReviewInput,
  ReviewModalButtons,
  ReviewModalWrapper,
  ReviewText,
} from "./review.style";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { ChangeEvent, FC, useState } from "react";
import niceDate from "../../../utils/formatting/formatDates";
import Modal from "../modal/modal.component";
import { deleteMyReview, editMyReview } from "../../../api/review-requests";
import FormButton from "../formButton/formButton.component";
import { ErrorMessage } from "../../authenticationComponents/authentication.style";
import { TReview } from "../../../types/review";
import ReviewProfile from "../reviewProfile/reviewProfile.component";

type ReviewCommonProps = {
  date: Date;
  review: string;
  rating: number;
  userImg?: string;
  userName: string;
  link?: string;
  pictureSize?: PROFILE_PICTURE_SIZE_CLASSES;
  edited?: boolean;
};

type ReviewConditionalProps =
  | {
      enableEditing: true;
      reviewId: string;
      handlePassUpdatedReview?: (review: TReview) => void;
      handlePassDeletedReview?: (reviewId: string) => void;
    }
  | {
      enableEditing?: false;
      reviewId?: never;
      handlePassUpdatedReview?: never;
      handlePassDeletedReview?: never;
    };

const Review: FC<ReviewCommonProps & ReviewConditionalProps> = ({
  date,
  review,
  rating,
  userImg,
  userName,
  link,
  pictureSize,
  edited,
  enableEditing = false,
  reviewId,
  handlePassUpdatedReview,
  handlePassDeletedReview,
}) => {
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [editIsLoading, setEditIsLoading] = useState<boolean>(false);
  const [editSuccess, setEditSuccess] = useState<boolean>(false);

  const [editReview, setEditReview] = useState<string>(review);
  const [editRating, setEditRating] = useState<number>(rating);
  const [editErrorMessage, setEditErrorMessage] = useState<string | undefined>(
    undefined
  );

  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [deleteIsLoading, setDeleteIsLoading] = useState<boolean>(false);
  const [deleteSuccess, setDeleteSuccess] = useState<boolean>(false);

  const [deleteErrorMessage, setDeleteErrorMessage] = useState<
    string | undefined
  >(undefined);

  const handleCloseEditModal = () => {
    setEditErrorMessage(undefined);
    setEditReview(review);
    setEditRating(rating);
    setEditModalOpen(false);
  };

  const handleChangeReview = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setEditErrorMessage(undefined);
    const { value: newReview } = event.target;
    if (newReview.length >= 500) return;
    setEditReview(newReview);
  };

  const handleChangeRating = (newRating: number) => {
    setEditErrorMessage(undefined);
    setEditRating(newRating);
  };

  const handlEditSave = async () => {
    setEditErrorMessage(undefined);
    if (editRating === rating && editReview === review) {
      return setEditModalOpen(false);
    }
    if (reviewId) {
      setEditIsLoading(true);
      const response = await editMyReview(reviewId, editRating, editReview);
      setEditIsLoading(false);
      console.log(response);
      if (response && response.status === "success") {
        setEditSuccess(true);
        handlePassUpdatedReview && handlePassUpdatedReview(response.data.data);
        setTimeout(function () {
          setEditSuccess(false);
          setEditModalOpen(false);
        }, 1000);
      } else setEditErrorMessage('"An error occured. Please try again!"');
    } else {
      setEditErrorMessage("An error occured. Please refresh the page!");
    }
  };

  const handleCloseDeleteModal = () => {
    setDeleteErrorMessage(undefined);
    setDeleteModalOpen(false);
  };

  const handleDeleteConfirm = async () => {
    setDeleteErrorMessage(undefined);
    if (reviewId) {
      setDeleteIsLoading(true);
      const response = await deleteMyReview(reviewId);
      setDeleteIsLoading(false);
      console.log(response);
      if (response && response.status === "success") {
        setDeleteSuccess(true);
        setTimeout(function () {
          setDeleteSuccess(false);
          document.body.style.overflowY = "scroll";
          setDeleteModalOpen(false);
          handlePassDeletedReview && handlePassDeletedReview(reviewId);
        }, 2000);
      } else setDeleteErrorMessage("An error occured. Please try again!");
    } else {
      setDeleteErrorMessage("An error occured. Please refresh the page!");
    }
  };

  return (
    <ReviewContainer>
      <ReviewInfos>
        <ReviewProfile
          userImg={userImg}
          userName={userName}
          link={link}
          pictureSize={pictureSize}
        />
        <ReviewDate>{`${niceDate(date)}${
          edited ? " (edited)" : ""
        }`}</ReviewDate>
      </ReviewInfos>
      <ReviewContent>
        <StarsRating hiddenValue={true} rating={rating} />
        <ReviewText>{review}</ReviewText>
      </ReviewContent>
      {enableEditing && (
        <EditButtons>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.empty}
            onClick={() => {
              setEditModalOpen(true);
            }}>
            Edit
          </Button>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.empty}
            onClick={() => {
              setDeleteModalOpen(true);
            }}>
            Delete
          </Button>
        </EditButtons>
      )}
      <Modal
        title="Edit review"
        handleClose={handleCloseEditModal}
        open={editModalOpen}
        closeOnClickOnOverlay={false}>
        <ReviewModalWrapper>
          <ReviewProfile
            userImg={userImg}
            userName={userName}
            link={link}
            pictureSize={pictureSize}
          />
          <StarsRating
            hiddenValue={false}
            rating={editRating}
            readonly={false}
            handleChangeRating={handleChangeRating}
          />
          <ReviewInput
            onChange={handleChangeReview}
            name="review"
            value={editReview}
            placeholder="Write a review (optional)"
          />
          <ReviewModalButtons>
            <Button
              buttonType={BUTTON_TYPE_CLASSES.cancel}
              onClick={handleCloseEditModal}>
              Cancel
            </Button>
            <FormButton
              loading={editIsLoading}
              success={editSuccess}
              handleClick={handlEditSave}>
              Save
            </FormButton>
          </ReviewModalButtons>
          <ErrorMessage>{editErrorMessage}</ErrorMessage>
        </ReviewModalWrapper>
      </Modal>
      <Modal
        title={"Delete selection"}
        handleClose={handleCloseDeleteModal}
        open={deleteModalOpen}>
        <DeleteReviewMessage>
          Are you sure you want to delete <br />
          this review?
        </DeleteReviewMessage>
        <ReviewModalButtons>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.cancel}
            onClick={handleCloseDeleteModal}>
            No
          </Button>
          <FormButton
            loading={deleteIsLoading}
            success={deleteSuccess}
            handleClick={handleDeleteConfirm}>
            Yes
          </FormButton>
        </ReviewModalButtons>
        <ErrorMessage>{deleteErrorMessage}</ErrorMessage>
      </Modal>
    </ReviewContainer>
  );
};
export default Review;
