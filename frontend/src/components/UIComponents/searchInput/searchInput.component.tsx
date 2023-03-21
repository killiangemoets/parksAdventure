import { FC, FormEvent, InputHTMLAttributes, useRef, useState } from "react";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
  ButtonWrapper,
  Delete,
  Glass,
  Input,
  SearchInputContainer,
  SearchInputDeleteButton,
  SearchInputForm,
} from "./searchInput.styled";

export type SearchInputProps = {
  handleSubmit: () => void;
  handleDelete: () => void;
} & InputHTMLAttributes<HTMLInputElement>;

const SearchInput: FC<SearchInputProps> = ({
  handleSubmit,
  handleDelete,
  ...props
}) => {
  const searchInput = useRef<HTMLInputElement | null>(null);
  const [showDelete, setShowDelete] = useState<boolean>(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit();
    if (searchInput && searchInput.current) searchInput.current.blur();
  };

  return (
    <SearchInputContainer>
      <SearchInputDeleteButton>
        <Button
          buttonType={BUTTON_TYPE_CLASSES.empty}
          onMouseOver={() => {
            setShowDelete(true);
          }}
          onMouseLeave={() => {
            setShowDelete(false);
          }}
          onClick={() => {
            handleDelete();
          }}
        >
          {showDelete ? <Delete /> : <Glass />}
        </Button>
      </SearchInputDeleteButton>

      <SearchInputForm onSubmit={onSubmit}>
        <Input ref={searchInput} {...props} />
        <ButtonWrapper>
          <Button buttonType={BUTTON_TYPE_CLASSES.input}>Search</Button>
        </ButtonWrapper>
      </SearchInputForm>
    </SearchInputContainer>
  );
};

export default SearchInput;
