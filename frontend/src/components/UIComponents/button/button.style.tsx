import styled from "styled-components";
import colors from "../../../colors";

export const BaseButton = styled.button`
  padding: 1.2rem 3.2rem;
  font-size: 1.8rem;
  letter-spacing: 1px;
  background-color: ${colors.primary};
  border: solid 2px ${colors.primary};
  color: ${colors.backgroundDark};
  border-radius: 999px;
  cursor: pointer;

  transition: all 0.3s;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  &:hover {
    background-color: ${colors.primaryDark};
    border: solid 2px ${colors.primaryDark};
  }
`;

export const InvertedButton = styled(BaseButton)`
  background: none;
  color: ${colors.primary};
  transition: all 0.5s;

  &:hover {
    border: solid 2px ${colors.primary};
    background-color: ${colors.primary};
    color: ${colors.white};
  }
`;

export const InputButton = styled(BaseButton)`
  border: 1px solid ${colors.lightGrey};
  padding: 1.1rem 3.6rem;

  &:hover {
    border: 1px solid ${colors.lightGrey};
  }
`;

export const EmptyButton = styled.button`
  width: auto;
  height: auto;
  padding: 0;
  font-size: 1.8rem;
  letter-spacing: 1px;
  background: none;
  color: ${colors.primary};
  cursor: pointer;
  border: none;
  transition: all 0.3s;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  &:hover {
    color: ${colors.primaryDark};
  }
`;

export const GalleryButton = styled(InvertedButton)`
  border-radius: 8px;
  padding: 0.8rem 1.2rem;
  background-color: rgba(250, 242, 229, 0.4);
  .stroke,
  .path {
    fill: ${colors.primary};
    transition: all 0.3s;
  }
  .fill {
    fill: rgba(204, 112, 75, 0);
  }

  &:hover {
    color: ${colors.primary};
    background-color: rgba(250, 242, 229, 0.6);
  }
`;

export const LightButton = styled(BaseButton)`
  background-color: ${colors.backgroundDark};
  border: 1px solid ${colors.grey};
  color: ${colors.grey};

  &:hover {
    background-color: ${colors.backgroundDark};
    border: 1px solid ${colors.grey};
  }
`;

export const RectangularButton = styled(BaseButton)`
  width: 22rem;
  height: 4rem;
  padding: 0.4rem 1.8rem;

  font-size: 1.4rem;
  font-weight: 400;
  text-transform: capitalize;
  letter-spacing: 1px;

  color: ${colors.darkGrey};
  background-color: ${colors.backgroundMediumDark};
  border-radius: 4px;
  border: 1px solid ${colors.primary};

  &:hover {
    border: 1px solid ${colors.primary};
    background-color: ${colors.backgroundMediumDark};
  }
`;

export const CancelButton = styled(BaseButton)`
  border: solid 2px ${colors.primary};
  background: none;
  color: ${colors.primary};
  transition: all 0.5s;

  &:hover {
    background: none;
    border: solid 2px ${colors.primaryDark};
    color: ${colors.primaryDark};
  }
`;

export const DeleteButton = styled(BaseButton)`
  border: solid 2px ${colors.veryLightRed};
  background: none;
  color: ${colors.veryLightRed};

  transition: all 0.5s;

  &:hover {
    color: ${colors.white};
    background: ${colors.veryLightRed};
    border: solid 2px ${colors.veryLightRed};
  }
`;

export const DeleteConfirmButton = styled(BaseButton)`
  border: solid 2px ${colors.veryLightRed};
  background: ${colors.veryLightRed};
  color: ${colors.white};

  transition: all 0.5s;

  &:hover {
    border: solid 2px ${colors.lightRed};
    background: ${colors.lightRed};
    color: ${colors.white};
  }
`;

export const DeleteCancelButton = styled(BaseButton)`
  border: solid 2px ${colors.veryLightRed};
  background: none;
  color: ${colors.veryLightRed};

  transition: all 0.5s;

  &:hover {
    border: solid 2px ${colors.lightRed};
    background: none;
    color: ${colors.lightRed};
  }
`;
