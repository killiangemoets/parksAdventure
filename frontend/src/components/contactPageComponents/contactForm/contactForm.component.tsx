import { ChangeEvent, FC, FormEvent, useState } from "react";
import {
  ContactFormContainer,
  ContactFormElement,
  ContactInputs,
  ContactSmallInputs,
} from "./contactForm.style";
import TextInput from "../../UIComponents/textInput/textInput.component";
import { ErrorMessage } from "../../authenticationComponents/authentication.style";
import FormButton from "../../UIComponents/formButton/formButton.component";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../UIComponents/title/title.component";
import LongTextInput from "../../UIComponents/longTextInput/longTextInput.component";
import { ContactData } from "../../../types/contact";
import { sendEmail } from "../../../api/email-request";
import { useSelector } from "react-redux";
import { selectUserReducer } from "../../../store/user/user.selector";
import { useSearchParams } from "react-router-dom";

type ContactFormProps = {
  showTitle?: boolean;
};

const ContactForm: FC<ContactFormProps> = ({ showTitle = true }) => {
  const [, setSearchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const user = useSelector(selectUserReducer);
  const [contactData, setContactData] = useState<ContactData>({
    firstname: user.firstname || "",
    lastname: user.lastname || "",
    email: user.email || "",
    phoneNumber: user.phoneNumber,
    message: "",
  });
  const { firstname, lastname, email, phoneNumber, message } = contactData;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (
      !firstname.trim() ||
      !lastname.trim() ||
      !email.trim() ||
      !message.trim()
    ) {
      setContactData({
        firstname: firstname.trim(),
        lastname: lastname.trim(),
        email: email.trim(),
        message: message.trim(),
      });
      setErrorMessage("Information is missing");
    }

    setLoading(true);
    const response = await sendEmail(contactData);
    setLoading(false);
    if (response?.status === "success") {
      setSearchParams({ success: "true" });
    } else setErrorMessage(response?.message);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    const newContactData = { ...contactData, [name]: value };
    setContactData(newContactData);
  };

  return (
    <ContactFormContainer>
      {showTitle && (
        <Title titleType={TITLE_TYPE_CLASSES.section}>Get in touch</Title>
      )}
      <ContactFormElement onSubmit={handleSubmit}>
        <ContactInputs>
          <ContactSmallInputs>
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
              type="tel"
              name="phoneNumber"
              value={phoneNumber}
              onChange={handleChange}
            />
          </ContactSmallInputs>

          <LongTextInput
            label="What would you like do discuss?"
            placeholder="your message"
            name="message"
            value={message}
            onChange={handleChange}
            required
          />
        </ContactInputs>
        <ErrorMessage>{errorMessage}</ErrorMessage>
        <FormButton loading={loading}>Send</FormButton>
      </ContactFormElement>
    </ContactFormContainer>
  );
};

export default ContactForm;
