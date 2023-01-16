import { useState } from "react";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
  CurrentPage,
  LeftPageIcon,
  PaginationContainer,
  RightPageIcon,
  ThreeDots,
} from "./pagination.style";

const Pagination = () => {
  return (
    <PaginationContainer>
      <Button buttonType={BUTTON_TYPE_CLASSES.empty}>
        <LeftPageIcon />
      </Button>
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>1</Button>

      <ThreeDots>...</ThreeDots>
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>4</Button>
      {/* <Button>5</Button> */}
      <CurrentPage>5</CurrentPage>
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>6</Button>
      <ThreeDots>...</ThreeDots>
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>16</Button>

      <Button buttonType={BUTTON_TYPE_CLASSES.empty}>
        <RightPageIcon />
      </Button>
    </PaginationContainer>
  );
};

export default Pagination;
