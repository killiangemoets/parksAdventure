import styled from "styled-components";
import { ReactComponent as CheckSVG } from "./../../../assets/icons/check-circle.svg";
import colors from "../../../colors";

export const FormButtonContainer = styled.div`
  button {
    min-width: 19.4rem;
    padding: 0rem 3.2rem;
    height: 5rem;
  }
`;

export const CheckIcon = styled(CheckSVG)`
  width: 3.2rem;
  height: 3.2rem;

  .path {
    stroke: ${colors.white};
  }
`;
