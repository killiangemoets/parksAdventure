import { ChangeEvent, FormEvent, useState } from "react";
import { CheckoutInputsUserData } from "../../../types/user";
import { AuthenticationForm, ErrorMessage } from "../../authenticationComponents/authentication.style";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../UIComponents/button/button.component";
import FormButton from "../../UIComponents/formButton/formButton.component";
import Modal from "../../UIComponents/modal/modal.component";
import TextInput from "../../UIComponents/textInput/textInput.component";
import {
  ContactInfo,
  ModalFooterNote,
  Name,
  PersonalDetailsContainer,
  PersonalDetailsWrapper,
} from "./personalDetails.style";
import { useDispatch, useSelector } from "react-redux";
import { selectUserReducer } from "../../../store/user/user.selector";
import { AppDispatch } from "../../../store/store";
import { updateUser } from "../../../store/user/user.action";
import { updateMe } from "../../../api/authentication-requests";

const PersonalDetails = () => {
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(selectUserReducer);
  const { firstname, lastname, email, phoneNumber } = user;
  const [userInputsData, setUserInputsData] = useState<CheckoutInputsUserData>({
    firstname,
    lastname,
    phoneNumber,
  });
    const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");
    const { value, name } = e.target;
    const newUserData = { ...userInputsData, [name]: value };
    setUserInputsData(newUserData);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const response = await updateMe(userInputsData);
    console.log(response);
    setLoading(false);
    if (response.status === "success") {
      setSuccess(true);
      dispatch(updateUser(userInputsData));
      setTimeout(function () {
        setSuccess(false);
        return setEditModalOpen(false);
      }, 1000);
    } else{
      if(response.message.includes('phoneNumber')) setErrorMessage('Please provide a valid phone number')
      else setErrorMessage("An error occured. Please try again!");
    }
  };

  const handleCloseModal = () => {
    console.log({
      firstname,
      lastname,
      phoneNumber,
    });
    setUserInputsData({
      firstname,
      lastname,
      phoneNumber,
    })
    setErrorMessage("");
    setEditModalOpen(false);
  }

  return (
    <PersonalDetailsContainer>
      <PersonalDetailsWrapper>
        <Name>{`${firstname} ${lastname}`}</Name>
        <ContactInfo>{email}</ContactInfo>
        <ContactInfo>{phoneNumber}</ContactInfo>
      </PersonalDetailsWrapper>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.empty}
        onClick={() => {
          setEditModalOpen(true);
        }}
      >
        Edit
      </Button>
      <Modal
        title="Personal info"
        handleClose={() => {handleCloseModal()}}
        open={editModalOpen}
      >
        <AuthenticationForm onSubmit={handleSubmit}>
          <TextInput
            label="Firstname"
            placeholder="your firstname"
            type="name"
            name="firstname"
            value={userInputsData.firstname || ""}
            onChange={handleChange}
            required
          />
          <TextInput
            label="Lastname"
            placeholder="your lastname"
            type="name"
            name="lastname"
            value={userInputsData.lastname || ""}
            onChange={handleChange}
            required
          />
          <TextInput
            editable={false}
            label="Email address"
            placeholder="you@example.com"
            type="email"
            name="email"
            value={email || ""}
            required
          />
          <TextInput
            label="Phone number (optional)"
            placeholder="000/00.00.00"
            type="tel"
            name="phoneNumber"
            value={userInputsData.phoneNumber || ""}
            onChange={handleChange}
          />
           <ErrorMessage>{errorMessage}</ErrorMessage>
          <FormButton loading={loading} success={success}>
            Save
          </FormButton>
        </AuthenticationForm>
        <ModalFooterNote>Your personal account information will be modified</ModalFooterNote>
      </Modal>
    </PersonalDetailsContainer>
  );
};

export default PersonalDetails;
