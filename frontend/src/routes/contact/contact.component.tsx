import { useSearchParams } from "react-router-dom";
import ContactForm from "../../components/contactPageComponents/contactForm/contactForm.component";
import {
  ContactBoldText,
  ContactContainer,
  ContactImage,
  ContactLeftContent,
  ContactLeftSection,
  ContactMainText,
  ContactText,
} from "./contact.style";
import ContactConfirmation from "../../components/contactPageComponents/contactConfirmation/contactConfirmation.style";

const Contact = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  if (success === "true")
    return (
      <ContactContainer>
        <ContactConfirmation />
      </ContactContainer>
    );

  return (
    <ContactContainer>
      <ContactLeftContent>
        <ContactLeftSection>
          <ContactImage>
            <img src="images/team-pic.jpeg" alt="Tour Guides Team" />
          </ContactImage>
          <ContactText>
            Looking for more information, having a question, or a booking issue?
            Our team will be more than happy to help and advise you!{" "}
            <span>Please do not hesitate to contact us!</span>
          </ContactText>
        </ContactLeftSection>
        <ContactLeftSection>
          <ContactMainText>Company Information</ContactMainText>
          <ContactBoldText>National Parks Hiking Tours</ContactBoldText>
          <ContactText>
            Wilderness Adventures Headquarters
            <br />
            123 Nature Trail Road
            <br />
            Evergreen City, UT 12345
            <br /> United States
          </ContactText>
          <ContactText>
            Head Office Phone: +1 (555) 123-4567
            <br />
            Contact Email: info@nationalparkshikingtours.com
          </ContactText>
        </ContactLeftSection>
      </ContactLeftContent>

      <ContactForm />
    </ContactContainer>
  );
};

export default Contact;
