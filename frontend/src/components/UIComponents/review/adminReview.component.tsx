import StarsRating from "../starsRating/starsRating.component";
import { PROFILE_PICTURE_SIZE_CLASSES } from "../profilePicture/profilePicture.component";
import {
  DeleteReviewMessage,
  EditButtons,
  ReviewContainer,
  ReviewContent,
  ReviewDate,
  ReviewInfos,
  ReviewModalButtons,
  ReviewText,
  ReviewTourName,
} from "./review.style";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { FC, useState } from "react";
import niceDate from "../../../utils/formatting/formatDates";
import Modal from "../modal/modal.component";
import { deleteMyReview } from "../../../api/review-requests";
import FormButton from "../formButton/formButton.component";
import { ErrorMessage } from "../../authenticationComponents/authentication.style";
import ReviewProfile from "../reviewProfile/reviewProfile.component";

type ReviewCommonProps = {
  date: Date;
  review: string;
  rating: number;
  userImg?: string;
  userName: string;
  tourImg?: string;
  tourName: string;
  link?: string;
  pictureSize?: PROFILE_PICTURE_SIZE_CLASSES;
  edited?: boolean;
  reviewId: string;
  handlePassDeletedReview?: (reviewId: string) => void;
};

const AdminReview: FC<ReviewCommonProps> = ({
  date,
  review,
  rating,
  userImg,
  userName,
  tourImg,
  tourName,
  link,
  pictureSize,
  edited,
  reviewId,
  handlePassDeletedReview,
}) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [deleteIsLoading, setDeleteIsLoading] = useState<boolean>(false);
  const [deleteSuccess, setDeleteSuccess] = useState<boolean>(false);

  const [deleteErrorMessage, setDeleteErrorMessage] = useState<
    string | undefined
  >(undefined);

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
          userImg={tourImg}
          userName={tourName}
          link={link}
          pictureSize={pictureSize}
        />
        <ReviewTourName>
          By <span>{userName}</span>
        </ReviewTourName>
        {/* <ReviewProfile
          userImg={userImg}
          userName={userName}
          link={link}
          pictureSize={pictureSize}
        />
        <ReviewTourName>
          About <span>{tourName}</span>
        </ReviewTourName> */}
      </ReviewInfos>
      <ReviewContent>
        <ReviewInfos>
          <StarsRating hiddenValue={true} rating={rating} />
          <ReviewDate>{`${niceDate(date)}${
            edited ? " (edited)" : ""
          }`}</ReviewDate>
        </ReviewInfos>
        <ReviewText>{review}</ReviewText>
      </ReviewContent>
      <EditButtons>
        <Button
          buttonType={BUTTON_TYPE_CLASSES.empty}
          onClick={() => {
            setDeleteModalOpen(true);
          }}>
          Delete
        </Button>
      </EditButtons>
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
export default AdminReview;
