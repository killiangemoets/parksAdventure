import { useNavigate } from "react-router-dom";
import {
  ContactConfirmationContainer,
  ContactConfirmationTextContent,
  ContactConfirmationTextElement,
} from "./contactConfirmation.style";
import Title from "../../UIComponents/title/title.component";
import Button from "../../UIComponents/button/button.component";

const ContactConfirmation = () => {
  const navigate = useNavigate();
  return (
    <ContactConfirmationContainer>
      <Title>Thank you for contacting us!</Title>
      <ContactConfirmationTextContent>
        <ContactConfirmationTextElement>
          One of our tour guides will contact you at the email
          <br />
          address provided <span>within 24 hours</span>.
        </ContactConfirmationTextElement>
        <ContactConfirmationTextElement>
          Be sure to check your email!
        </ContactConfirmationTextElement>
      </ContactConfirmationTextContent>
      <Button
        onClick={() => {
          navigate("/");
        }}>
        Back to Home
      </Button>
    </ContactConfirmationContainer>
  );
};

export default ContactConfirmation;
