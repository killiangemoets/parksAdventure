import Title, {
  TITLE_TYPE_CLASSES,
} from "../../UIComponents/title/title.component";
import { AboutTour, SummarySectionContainer } from "./summarySection.style";

const SummarySection = () => {
  return (
    <SummarySectionContainer>
      <Title titleType={TITLE_TYPE_CLASSES.section}>
        About the Forest Hiker Tour
      </Title>
      <AboutTour>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel modi quam
        deserunt sed ut, aspernatur sit debitis animi nulla provident quaerat
        necessitatibus fuga blanditiis ipsa repudiandae quia quos nostrum? Et.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa optio
        <br />
        <br />
        asperiores tempora, quia cupiditate tempore temporibus veniam,
        consequuntur est veritatis consectetur sequi mollitia ad magni at in,
        culpa iure deserunt.
      </AboutTour>
    </SummarySectionContainer>
  );
};

export default SummarySection;
