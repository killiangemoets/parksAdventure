import { useSelector } from "react-redux";
import Button from "../../components/UIComponents/button/button.component";
import Title from "../../components/UIComponents/title/title.component";
import {
  ConfirmationStepContactLink,
  ConfirmationStepContainer,
  ConfirmationStepHelpSection,
  ConfirmationStepTextContent,
  ConfirmationStepTextElement,
} from "./confirmationStep.style";
import { selectUserReducer } from "../../store/user/user.selector";
import { useNavigate } from "react-router-dom";

const ConfirmationStep = () => {
  const user = useSelector(selectUserReducer);
  const navigate = useNavigate()
  return (
    <ConfirmationStepContainer>
      <Title>{`Thank your for order ${user.firstname}!`}</Title>
      <ConfirmationStepTextContent>
        <ConfirmationStepTextElement>
          An order confirmation email has been sent to{" "}
          <span>{user.email}</span>.
        </ConfirmationStepTextElement>
        <ConfirmationStepTextElement>
          We are looking forward to meeting you on the hike.
        </ConfirmationStepTextElement>
      </ConfirmationStepTextContent>
      <Button onClick={() => {navigate("/profile/bookings")}}>View Booking Confirmation</Button>
      <ConfirmationStepHelpSection>
        Need help?{" "}
        <ConfirmationStepContactLink to={"/contact"}>
          Contact Us
        </ConfirmationStepContactLink>
      </ConfirmationStepHelpSection>
    </ConfirmationStepContainer>
  );
};

export default ConfirmationStep;
