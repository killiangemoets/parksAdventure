import { ChangeEvent, FC, useState } from "react";
import { CheckoutUserData } from "../../../types/user";
import { AuthenticationForm } from "../../authenticationComponents/authentication.style";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../UIComponents/button/button.component";
import FormButton from "../../UIComponents/formButton/formButton.component";
import Modal from "../../UIComponents/modal/modal.component";
import TextInput from "../../UIComponents/textInput/textInput.component";
import {
  ContactInfo,
  Name,
  PersonalDetailsContainer,
  PersonalDetailsWrapper,
} from "./personalDetails.style";

const PersonalDetails = () => {
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<CheckoutUserData>({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
  });
  const { firstname, lastname, email, phoneNumber } = userData;
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    const newUserData = { ...userData, [name]: value };
    setUserData(newUserData);
  };

  const handleSubmit = () => {};

  return (
    <PersonalDetailsContainer>
      <PersonalDetailsWrapper>
        <Name>Lucas Scott</Name>
        <ContactInfo>lucas.scott@gmail.com</ContactInfo>
        <ContactInfo>(+32) 0479 48 32 12</ContactInfo>
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
        handleClose={() => {
          setEditModalOpen(false);
        }}
        open={editModalOpen}
      >
        <AuthenticationForm onSubmit={handleSubmit}>
          <TextInput
            label="Firstname"
            placeholder="your firstname"
            type="name"
            name="firstname"
            value={firstname}
            onChange={handleChange}
            required
          />
          <TextInput
            label="Lastname"
            placeholder="your lastname"
            type="name"
            name="lastname"
            value={lastname}
            onChange={handleChange}
            required
          />
          <TextInput
            label="Email address"
            placeholder="you@example.com"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
          <TextInput
            label="Phone number (optional)"
            placeholder="000/00.00.00"
            type="name"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleChange}
          />
          <FormButton loading={loading} success={success}>
            Save
          </FormButton>
        </AuthenticationForm>
      </Modal>
    </PersonalDetailsContainer>
  );
};

export default PersonalDetails;
