import styled from "styled-components";
import { ReactComponent as PlusSVG } from "../../../assets/icons/plusSmall.svg";
import { ReactComponent as TrashSVG } from "./../../../assets/icons/trash.svg";
import { ReactComponent as EyeSVG } from "./../../../assets/icons/eye.svg";
import colors from "../../../colors";

export const ImagesInputContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 16rem);
  gap: 1rem;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 16rem;
  height: 16rem;
  background-color: ${colors.backgroundDark};
  border: 1px dashed ${colors.primary};
  border-radius: 8px;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    background-color: ${colors.backgroundMediumDark};
    border-color: ${colors.primaryDark};
    color: ${colors.primaryDark};
  }
`;

export const ImagesInputElement = styled.input`
  top: 0;
  left: 0;
  position: absolute;
  width: 16rem;
  height: 16rem;
  opacity: 0;
  cursor: pointer;
`;

export const ImageElementHover = styled.div`
  cursor: grab;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.4rem;
  border-radius: 8px;
  background-color: rgba(170, 170, 170, 0.5);
  opacity: 0;
  transition: 0.3s;
`;

export const ImageButtons = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.4rem;
  transition: 0.3s;
  opacity: 0;
`;

export const ImageElement = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed ${colors.primary};
  border-radius: 8px;
  transition: 0.3s;

  &:hover {
    & ${ImageElementHover} {
      opacity: 1;
    }
    & ${ImageButtons} {
      opacity: 1;
    }
  }
`;

export const TourImage = styled.img`
  width: 100%;
  height: 15rem;
  overflow: hidden;
  padding: 0.2rem;
  object-fit: contain;
  width: auto;
`;

export const LargeTourImage = styled(TourImage)`
  height: 31.4rem;
`;

export const ImagesInputText = styled.div`
  width: 16rem;
  height: 16rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  cursor: pointer;
`;

export const PlusIcon = styled(PlusSVG)`
  width: 2.6rem;
  height: 2.6rem;
  .path {
    stroke: ${colors.primary};
  }
`;

export const UploadText = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
  text-transform: capitalize;
  letter-spacing: 1px;
  color: ${colors.primary};
`;

export const TrashIcon = styled(TrashSVG)`
  width: 2.6rem;
  height: 2.6rem;
  transition: all 0.3s;
  .path {
    stroke: ${colors.white};
  }

  &:hover {
    .path {
      stroke: ${colors.primary};
    }
  }
`;
export const EyeIcon = styled(EyeSVG)`
  width: 2.6rem;
  height: 2.6rem;
  transition: all 0.3s;
  .path {
    stroke: ${colors.white};
  }

  &:hover {
    .path {
      stroke: ${colors.primary};
    }
  }
`;
