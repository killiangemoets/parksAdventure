import { ChangeEvent, FC, useState } from "react";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../UIComponents/button/button.component";
import {
  ActionButtonsContainer,
  DeleteMessage,
  WarningIcon,
} from "./actionButtons.style";
import Modal from "../../UIComponents/modal/modal.component";
import WarningMessage from "../../UIComponents/warningMessage/waringMessage.component";
import {
  DeleteQuestion,
  ErrorMessage,
} from "../adminNavbars/adminNavbar.style";
import TextInput from "../../UIComponents/textInput/textInput.component";
import { ButtonSection } from "../../allToursPageComponents/filtersModal/filtersModalstyle";
import {
  DeleteReviewMessage,
  ReviewModalButtons,
} from "../../UIComponents/review/review.style";
import FormButton from "../../UIComponents/formButton/formButton.component";
import { deleteUser, updateUserRequest } from "../../../api/user-requests";
import { GeneralUserTableInfo } from "../../../types/user";

export type ActionButtonsProps = {
  userInfo: GeneralUserTableInfo;
  handlePassDeletedUser?: (userId: string) => void;
  handlePassUpdateUserActivation?: (userId: string) => void;
  deleteMessage?: string;
  desactivateMessage?: string;
};

const ActionButtons: FC<ActionButtonsProps> = ({
  userInfo,
  handlePassDeletedUser,
  handlePassUpdateUserActivation,
  deleteMessage,
  desactivateMessage,
}) => {
  const [showActivationModal, setShowActivationModal] =
    useState<boolean>(false);

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [confirmUserEmail, setConfirmUserEmail] = useState<string>("");
  const [deleteErrorMessage, setDeleteErrorMessage] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleActivation = async () => {
    setDeleteErrorMessage("");

    setIsLoading(true);
    const response = await updateUserRequest(userInfo.key.toString(), {
      active: userInfo.status === "active" ? false : true,
    });
    setIsLoading(false);

    if (response && response.status === "success") {
      setSuccess(true);
      setTimeout(function () {
        setSuccess(false);
        document.body.style.overflowY = "scroll";
        setShowActivationModal(false);
        handlePassUpdateUserActivation &&
          handlePassUpdateUserActivation(userInfo.key.toString());
      }, 2000);
    } else {
      if (
        response &&
        response.message.includes("A tour must have at least one guide")
      )
        setDeleteErrorMessage("A tour must have at least one guide");
      else setDeleteErrorMessage("An error occured. Please try again!");
    }
  };

  const handleDelete = async () => {
    setDeleteErrorMessage("");
    if (confirmUserEmail?.toLowerCase() !== userInfo.email.toLowerCase())
      return setDeleteErrorMessage("The email is not correct");

    setIsLoading(true);
    const response = await deleteUser(userInfo.key.toString());
    setIsLoading(false);
    if (response && response.status === "success") {
      setSuccess(true);
      handlePassDeletedUser && handlePassDeletedUser(userInfo.key.toString());
      setTimeout(function () {
        setSuccess(false);
        document.body.style.overflowY = "scroll";
        setShowDeleteModal(false);
      }, 2000);
    } else setDeleteErrorMessage("An error occured. Please try again!");
  };

  return (
    <>
      <ActionButtonsContainer>
        <Button
          buttonType={BUTTON_TYPE_CLASSES.empty}
          onClick={() => {
            setShowActivationModal(true);
          }}>
          {userInfo.status === "active" ? "Desactivate" : "Activate"}
        </Button>

        <Button
          buttonType={BUTTON_TYPE_CLASSES.empty}
          onClick={() => {
            setShowDeleteModal(true);
          }}>
          Delete
        </Button>
      </ActionButtonsContainer>
      <Modal
        title="Delete User"
        handleClose={() => setShowDeleteModal(false)}
        open={showDeleteModal}>
        <WarningMessage />

        <DeleteQuestion>
          Are you sure you want to the delete the user with the email <br />{" "}
          <span>{`${userInfo.email}`}</span>?
        </DeleteQuestion>
        {deleteMessage && (
          <DeleteMessage>
            {" "}
            <WarningIcon /> {deleteMessage}
          </DeleteMessage>
        )}
        <TextInput
          label="Write the user email to continue"
          placeholder="user email"
          type="text"
          name="userEmail"
          value={confirmUserEmail}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setConfirmUserEmail(e.target.value);
          }}
          required
        />
        <ErrorMessage>{deleteErrorMessage}</ErrorMessage>
        <ButtonSection>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.deleteCancel}
            onClick={() => {
              setConfirmUserEmail("");
              setShowDeleteModal(false);
            }}>
            Cancel
          </Button>
          <FormButton
            loading={isLoading}
            success={success}
            buttonType={BUTTON_TYPE_CLASSES.deleteConfirm}
            handleClick={handleDelete}>
            Delete
          </FormButton>
        </ButtonSection>
      </Modal>
      <Modal
        title={`${
          userInfo.status === "active" ? "Desactivate" : "Activate"
        } User`}
        handleClose={() => {
          setShowActivationModal(false);
        }}
        open={showActivationModal}>
        <DeleteReviewMessage>
          Are you sure you want to{" "}
          <span>
            {userInfo.status === "active" ? "desactivate" : "activate"}
          </span>{" "}
          <br />
          this user?
        </DeleteReviewMessage>
        {desactivateMessage && userInfo.status === "active" ? (
          <DeleteMessage>
            <WarningIcon /> {desactivateMessage}
          </DeleteMessage>
        ) : (
          ""
        )}
        <ReviewModalButtons>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.cancel}
            onClick={() => {
              setShowActivationModal(false);
            }}>
            No
          </Button>
          <FormButton
            loading={isLoading}
            success={success}
            handleClick={handleActivation}>
            Yes
          </FormButton>
        </ReviewModalButtons>
        <ErrorMessage>{deleteErrorMessage}</ErrorMessage>
      </Modal>
    </>
  );
};
export default ActionButtons;
