import { ChangeEvent, FC } from "react";
import { CREATE_TOUR_DATA } from "../../../../types/tour";
import {
  AddTourTitleContainer,
  AddTourTitleWrapper,
  TitleInput,
} from "./addTourTitle.style";

export type AddTourTitleProps = {
  title: string;
  handleChange: (value: string, name: string) => void;
  error: boolean;
};

const AddTourTitle: FC<AddTourTitleProps> = ({
  title,
  handleChange,
  error = false,
}) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (value.length > 40) return;
    handleChange(value, name);
  };
  return (
    <AddTourTitleContainer>
      <AddTourTitleWrapper>
        <TitleInput
          placeholder="Add the tour title here"
          value={title}
          name={CREATE_TOUR_DATA.name}
          onChange={onChange}
          error={error}
        />
      </AddTourTitleWrapper>
    </AddTourTitleContainer>
  );
};
export default AddTourTitle;
