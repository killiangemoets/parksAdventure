import styled from "styled-components";
import { ReactComponent as TrashSVG } from "./../../../assets/trash.svg";

export const SmallProfilePicture = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 100rem;
  background-color: #aaa;

  img {
    width: 4rem;
    height: 4rem;
    border-radius: 100rem;
    object-fit: cover;
  }

  &:hover {
    img {
      background-color: red;
    }
  }
`;

export const MediumProfilePicture = styled.div`
  width: 6rem;
  height: 6rem;
  border-radius: 100rem;
  background-color: #aaa;

  img {
    width: 6rem;
    height: 6rem;
    border-radius: 100rem;
    object-fit: cover;
  }
`;

export const LargeProfilePicture = styled.div`
  width: 10rem;
  height: 10rem;
  border-radius: 100rem;
  background-color: #aaa;

  img {
    width: 10rem;
    height: 10rem;
    border-radius: 100rem;
    object-fit: cover;
  }
`;

export const ExtraLargeProfilePicture = styled.div`
  position: relative;
  width: 14rem;
  height: 14rem;
  border-radius: 100rem;
  background-color: #aaa;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 14rem;
    height: 14rem;
    border-radius: 100rem;
    object-fit: cover;
  }
`;

export const DeleteButtonWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100rem;
  background-color: rgba(170, 170, 170, 0.5);
`;

export const TrashIcon = styled(TrashSVG)`
  width: 3rem;
  height: 3rem;
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
