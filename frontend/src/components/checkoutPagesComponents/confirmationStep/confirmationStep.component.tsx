import Button from "../../UIComponents/button/button.component";
import Title from "../../UIComponents/title/title.component";
import {
  ConfirmationStepContactLink,
  ConfirmationStepContainer,
  ConfirmationStepHelpSection,
  ConfirmationStepTextContent,
  ConfirmationStepTextElement,
} from "./confirmationStep.style";

const ConfirmationStep = () => {
  return (
    <ConfirmationStepContainer>
      <Title>Thank your for order Lucas!</Title>
      <ConfirmationStepTextContent>
        <ConfirmationStepTextElement>
          An order confirmation email has been sent to{" "}
          <span>lucas.scott@gmail.com</span>.
        </ConfirmationStepTextElement>
        <ConfirmationStepTextElement>
          We are looking forward to meeting you on the hike.
        </ConfirmationStepTextElement>
      </ConfirmationStepTextContent>
      <Button>View Order Confirmation</Button>
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
