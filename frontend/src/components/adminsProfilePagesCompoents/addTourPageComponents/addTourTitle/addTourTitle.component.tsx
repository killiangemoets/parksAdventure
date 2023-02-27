import {
  AddTourTitleContainer,
  AddTourTitleWrapper,
  TitleInput,
} from "./addTourTitle.style";

const AddTourTitle = () => {
  return (
    <AddTourTitleContainer>
      <AddTourTitleWrapper>
        <TitleInput placeholder="Add the tour title here" />
      </AddTourTitleWrapper>
    </AddTourTitleContainer>
  );
};
export default AddTourTitle;
