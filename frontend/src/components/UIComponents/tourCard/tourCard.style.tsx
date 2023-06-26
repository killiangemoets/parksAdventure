import styled, { css } from "styled-components";

import { ReactComponent as HeartSVG } from "../../../assets/heart.svg";
import { Link } from "react-router-dom";

export const TourPictureContainer = styled.div`
  width: 100%;
  -webkit-clip-path: polygon(0 0, 100% 0%, 100% 86%, 0% 98%);
  clip-path: polygon(0 0, 100% 0%, 100% 86%, 0% 98%);
  height: 22rem;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  overflow: hidden;
`;

type TourPictureProps = {
  imageUrl: string;
};

export const TourPicture = styled.div<TourPictureProps>`
  width: 100%;
  height: 100%;
  background: ${({ imageUrl }) => `url(${imageUrl})`} no-repeat left center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  position: relative;
  background-position: center;
  transition: transform 0.3s cubic-bezier(0.25, 0.45, 0.45, 0.95);
`;

export const TourCardContainer = styled(Link)`
  position: relative;
  cursor: pointer;
  width: 32rem;
  height: 100%;
  border-radius: 12px;
  background-color: #fefdfa;
  -webkit-box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.1);
  box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.1);
  transition: 0.3s all;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  button {
    position: absolute;
    z-index: 1;
    right: 1.8rem;
    top: 1.2rem;
  }

  &:hover {
    & ${TourPicture} {
      transform: scale(1.1);
    }
  }
`;

type WishListIconProps = {
  inWishList: boolean;
};

export const WishListIcon = styled(HeartSVG)<WishListIconProps>`
  width: 2.4rem;
  height: 2.4rem;
  cursor: pointer;
  .stroke {
    fill: #cc704b;
  }
  .fill {
    fill: rgba(204, 112, 75, 0.32);
    transition: all 0.3s;
  }

  &:hover {
    .fill {
      fill: #cc704b;
    }
  }

  ${({ inWishList }) =>
    inWishList &&
    css`
      .fill {
        fill: #cc704b;
      }
    `}
`;

export const TourTitle = styled.h3`
  position: absolute;
  right: 1.8rem;
  top: 15.2rem;
  width: 70%;
  color: #fefdfa;

  text-transform: uppercase;
  font-weight: 300;
  letter-spacing: 1px;
  font-size: 2.6rem;
  text-align: right;

  span {
    padding: 0.6rem 1.2rem;
    line-height: 1.6;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
    border-radius: 2px;

    background-image: -webkit-gradient(
      linear,
      left top,
      right bottom,
      from(#e0a993),
      to(#cc704b)
    );

    background-image: -webkit-gradient(
      linear,
      left top,
      right bottom,
      from(#db9b81),
      to(#cc704b)
    );
  }
`;

export const TourContent = styled.div`
  padding: 1.2rem 2.4rem 0 2.4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  margin-bottom: -1rem;
`;

export const TourNextDate = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  /* letter-spacing: 0.4px; */
  text-transform: uppercase;
  color: #303a29;
  color: #cc704b;
`;

export const TourTags = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;
export const TourTag = styled.p`
  background-color: #e0a993;
  color: #fff;
  font-size: 1.2rem;
  line-height: 1.6rem;
  letter-spacing: 0.2px;
  font-weight: 500;
  padding: 0.2rem 0.8rem;
  border-radius: 8px;
  /* font-style: italic; */
`;

export const TourInfos = styled.div`
  margin-top: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: center;
  gap: 1.8rem;
`;

export const Info = styled.div`
  display: flex;
  /* align-items: center; */
  /* justify-content: center; */
  gap: 1.2rem;
`;

export const InfoText = styled.p`
  font-size: 1.2rem;
  letter-spacing: 0.4px;
`;

export const TourFooter = styled.div`
  margin-top: 1rem;
  padding: 1.6rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 1.4rem;
  background-color: #fdfaf5;
  border-top: 1.8px solid #ebc6b7;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
`;

export const Price = styled.p`
  font-size: 1.3rem;
  font-weight: 500;
  letter-spacing: 0.2px;

  span {
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

export const TourCardHidden = styled.div`
  position: absolute;
  background-color: rgba(170, 170, 170, 0.3);
  border-radius: 8px;
  width: 100%;
  height: 100%;
  z-index: 2;
  overflow: hidden;

  font-size: 2rem;
  color: #fff;
`;

export const CornerBannner = styled.div`
  color: #fff;
  background-color: #bbb;
  -moz-transform: rotate(-45deg);
  -moz-transform-origin: 50% 50%;
  -webkit-transform: rotate(-45deg);
  -webkit-transform-origin: 50% 50%;
  position: absolute;
  width: 300px;
  top: 40px;
  left: -100px;
  text-align: center;

  text-transform: uppercase;
  font-weight: 500;
  font-size: 1.6rem;
`;
