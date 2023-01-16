import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
  ButtonWrapper,
  Glass,
  Input,
  SearchInputContainer,
} from "./searchInput.styled";

const SearchInput = () => {
  return (
    <SearchInputContainer>
      <Glass />
      <Input placeholder="tour name, location, ..." />
      <ButtonWrapper>
        <Button buttonType={BUTTON_TYPE_CLASSES.input}>Search</Button>
      </ButtonWrapper>
    </SearchInputContainer>
  );
};

export default SearchInput;
