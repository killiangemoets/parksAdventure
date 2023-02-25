import AddTourCalendar from "../../components/adminsProfilePagesCompoents/addTourPageComponents/addTourCalendar/addTourCalendar.component";
import AddTourDetails from "../../components/adminsProfilePagesCompoents/addTourPageComponents/addTourDetails/addTourDetails.component";
import AddTourImages from "../../components/adminsProfilePagesCompoents/addTourPageComponents/addTourImages/addTourImages.component";
import AddTourItinerary from "../../components/adminsProfilePagesCompoents/addTourPageComponents/addTourItinerary/addTourItinerary.component";
import AddTourPracticalInfos from "../../components/adminsProfilePagesCompoents/addTourPageComponents/addTourPracticalInfos/addTourPracticalInfos.component";
import AddTourTitle from "../../components/adminsProfilePagesCompoents/addTourPageComponents/addTourTitle/addTourTitle.component";
import { AddTourContainer } from "./addTour.style";

const AddTour = () => {
  return (
    <AddTourContainer>
      <AddTourTitle />
      <AddTourImages />
      <AddTourDetails />
      <AddTourItinerary />
      <AddTourCalendar />
      <AddTourPracticalInfos />
    </AddTourContainer>
  );
};

export default AddTour;
