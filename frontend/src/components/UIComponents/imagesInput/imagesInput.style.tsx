import styled from "styled-components";
import { ReactComponent as PlusSVG } from "../../../assets/plusSmall.svg";
import { ReactComponent as TrashSVG } from "./../../../assets/trash.svg";
import { ReactComponent as EyeSVG } from "./../../../assets/eye.svg";

export const ImagesInputContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 16rem);
  gap: 1rem;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 16rem;
  height: 16rem;
  background-color: #faf2e5;
  border: 1px dashed #cc704b;
  border-radius: 8px;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #f9eedb;
    border-color: #b86544;
    color: #b86544;
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

export const ImageElement = styled.div`
  position: relative;
  width: 16rem;
  height: 16rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed #cc704b;
  border-radius: 8px;
  transition: 0.3s;

  &:hover {
    & ${ImageElementHover} {
      opacity: 1;
    }
  }

  img {
    max-width: 15rem;
    max-height: 15rem;
    object-fit: contain;
    /* height: auto; */
    width: auto;
  }
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
    stroke: #cc704b;
  }
`;

export const UploadText = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
  text-transform: capitalize;
  letter-spacing: 1px;
  color: #cc704b;
`;

export const TrashIcon = styled(TrashSVG)`
  width: 2.6rem;
  height: 2.6rem;
  transition: all 0.3s;
  .path {
    stroke: #fff;
  }

  &:hover {
    .path {
      stroke: #cc704b;
    }
  }
`;
export const EyeIcon = styled(EyeSVG)`
  width: 2.6rem;
  height: 2.6rem;
  transition: all 0.3s;
  .path {
    stroke: #fff;
  }

  &:hover {
    .path {
      stroke: #cc704b;
    }
  }
`;
