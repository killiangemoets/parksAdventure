import { ChangeEvent, FC } from "react";
import { TOUR_DATA } from "../../../../routes/addTour/addTour.component";
import {
  AddTourTitleContainer,
  AddTourTitleWrapper,
  TitleInput,
} from "./addTourTitle.style";

export type AddTourTitleProps = {
  title: string;
  handleChange: (value: string, name: string) => void;
};

const AddTourTitle: FC<AddTourTitleProps> = ({ title, handleChange }) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    handleChange(value, name);
  };
  return (
    <AddTourTitleContainer>
      <AddTourTitleWrapper>
        <TitleInput
          placeholder="Add the tour title here"
          value={title}
          name={TOUR_DATA.title}
          onChange={onChange}
        />
      </AddTourTitleWrapper>
    </AddTourTitleContainer>
  );
};
export default AddTourTitle;
