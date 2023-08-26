import Title, {
  TITLE_TYPE_CLASSES,
} from "../../UIComponents/title/title.component";
import {
  ErrorMessage,
  ErrorMessageWrapper,
  SettingsContainer,
  SettingsContent,
  SettingsText,
  SettingsWrapper2,
} from "./settings.style";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../UIComponents/button/button.component";
import Modal from "../../UIComponents/modal/modal.component";
import WarningMessage from "../../UIComponents/warningMessage/waringMessage.component";
import { DeleteQuestion } from "../../adminsProfilePagesComponents/adminNavbars/adminNavbar.style";
import {
  DeleteMessage,
  DeleteMessages,
  WarningIcon,
} from "../../adminsProfilePagesComponents/usersTable/actionButtons.style";
import { ChangeEvent, useState } from "react";
import FormButton from "../../UIComponents/formButton/formButton.component";
import { ButtonSection } from "../../allToursPageComponents/filtersModal/filtersModalstyle";
import TextInput from "../../UIComponents/textInput/textInput.component";
import { deleteMe } from "../../../api/user-requests";
import { selectEmail } from "../../../store/user/user.selector";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../../../store/user/user.action";

const DeleteAccount = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const userEmail = useSelector(selectEmail);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [confirmEmail, setConfirmEmail] = useState<string>("");
  const [deleteErrorMessage, setDeleteErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleDelete = async () => {
    setDeleteErrorMessage("");
    if (confirmEmail.length === 0)
      return setDeleteErrorMessage("Please confirm your email address");
    if (confirmEmail?.toLowerCase() !== userEmail)
      return setDeleteErrorMessage("The email is incorrect");

    setIsLoading(true);
    const response = await deleteMe();
    setIsLoading(false);
    if (response && response.status === "success") {
      setSuccess(true);
      setTimeout(function () {
        setShowDeleteModal(false);
        navigate("/");
        setTimeout(() => {
          dispatch(removeUser());
        }, 200);
      }, 2000);
    } else if (
      response &&
      response.message.includes(
        "cannot delete your account if you have upcoming bookings."
      )
    ) {
      setDeleteErrorMessage(response.message);
    } else {
      setDeleteErrorMessage(
        "An error occured. Please refresh the page and try again!"
      );
    }
  };

  const closeModal = () => {
    setConfirmEmail("");
    setDeleteErrorMessage("");
    setShowDeleteModal(false);
  };

  return (
    <SettingsContainer>
      <SettingsWrapper2>
        <Title titleType={TITLE_TYPE_CLASSES.section}>Delete Account</Title>
        <SettingsContent>
          <SettingsText>
            When you account is deleted, you will be logged out of Natianal
            Parks Hiking Tours, and this account will no longer be usable.
          </SettingsText>
          <Button onClick={() => setShowDeleteModal(true)}>
            Delete My Account
          </Button>
        </SettingsContent>
      </SettingsWrapper2>
      <Modal
        title="Delete User"
        handleClose={closeModal}
        open={showDeleteModal}>
        <WarningMessage />
        <DeleteQuestion>
          Are you absolutely sure you want to the delete your account?
        </DeleteQuestion>
        <DeleteMessages>
          <DeleteMessage>
            <WarningIcon /> Please note that there is no option to restore the
            account or its data once it's deleted.
          </DeleteMessage>
        </DeleteMessages>

        <TextInput
          label="Write your email address to continue"
          placeholder="email address"
          type="text"
          name="userEmail"
          value={confirmEmail}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setConfirmEmail(e.target.value);
          }}
          required
        />
        <ErrorMessageWrapper>
          <ErrorMessage>{deleteErrorMessage}</ErrorMessage>
        </ErrorMessageWrapper>
        <ButtonSection>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.deleteCancel}
            onClick={() => {
              closeModal();
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
    </SettingsContainer>
  );
};
export default DeleteAccount;
