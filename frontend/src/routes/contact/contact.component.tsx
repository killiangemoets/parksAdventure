import { useSearchParams } from "react-router-dom";
import ContactForm from "../../components/contactPageComponents/contactForm/contactForm.component";
import {
  ContactBoldText,
  ContactContainer,
  ContactFormContainer,
  ContactImage,
  ContactLeftSection,
  ContactLeftSection2,
  ContactMainText,
  ContactText,
} from "./contact.style";
import ContactConfirmation from "../../components/contactPageComponents/contactConfirmation/contactConfirmation.style";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../components/UIComponents/title/title.component";
import { useEffect, useState } from "react";

const Contact = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1000 && !isSmallScreen) {
        setIsSmallScreen(true);
      } else if (window.innerWidth > 1000 && isSmallScreen) {
        setIsSmallScreen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
  }, [isSmallScreen]);

  if (success === "true")
    return (
      <ContactContainer>
        <ContactConfirmation />
      </ContactContainer>
    );

  return (
    <ContactContainer>
      <ContactLeftSection>
        {isSmallScreen && (
          <Title titleType={TITLE_TYPE_CLASSES.section}>Get in touch</Title>
        )}
        <ContactImage>
          <img src="images/team-pic.jpeg" alt="Tour Guides Team" />
        </ContactImage>
        <ContactText>
          Looking for more information, having a question, or a booking issue?
          Our team will be more than happy to help and advise you!{" "}
          <span>Please do not hesitate to contact us!</span>
        </ContactText>
      </ContactLeftSection>
      <ContactLeftSection2>
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
      </ContactLeftSection2>
      <ContactFormContainer>
        <ContactForm showTitle={!isSmallScreen} />
      </ContactFormContainer>
    </ContactContainer>
  );
};

export default Contact;
