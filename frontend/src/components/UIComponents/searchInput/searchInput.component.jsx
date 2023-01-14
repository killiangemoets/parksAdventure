import Button from "../button/button.component";
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
        <Button buttonType="input">Search</Button>
      </ButtonWrapper>
    </SearchInputContainer>
  );
};

export default SearchInput;
