import styled from "styled-components";
import { Popup } from "react-map-gl";
import { BaseButton } from "../../../UIComponents/button/button.style";
import colors from "../../../../colors";

export const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const InfoPopup = styled(Popup)`
  margin-top: -3.6rem;
  width: auto;
  height: auto;
  max-width: none !important;
`;

type InputItineraryProps = {
  error?: boolean;
};

export const PopupInputContainer = styled.div<InputItineraryProps>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;

  .ant-input {
    min-width: 32rem;

    padding: 0.4rem 1.8rem;
    height: 4rem;

    background-color: ${colors.white};
    border: 1px solid ${colors.primary};
    border-radius: 4px;
    box-shadow: none;
    transition: all 0.3s;

    font-size: 1.4rem;
    font-weight: 400;
    letter-spacing: 1px;
    font-family: inherit;
    color: inherit;

    ${({ error }) =>
      error && {
        border: "2px solid",
        borderColor: colors.error,
      }}

    &::placeholder {
      color: ${colors.grey};
      font-size: 1.4rem;
      font-weight: 400;
    }

    &:focus {
      outline: none;
    }
  }

  @media (max-width: 800px) {
    gap: 0.4rem;
    .ant-input {
      min-width: 20rem;
    }
  }
`;

export const PopupButton = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;

  & ${BaseButton} {
    padding: 0.8rem 2.4rem;
    width: 10rem;
    font-size: 1.4rem;
    letter-spacing: 0.6px;
  }

  @media (max-width: 800px) {
    & ${BaseButton} {
      padding: 0.6rem 0;
      width: 6.4rem;
      font-size: 1.2rem;
      letter-spacing: 0.4px;
    }
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const ErrorMessage = styled.p`
  padding-left: 0.8rem;
  color: ${colors.error};
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: 0.4px;
  height: 2rem;
`;
