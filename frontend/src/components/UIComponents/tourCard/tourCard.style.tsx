import styled, { css } from "styled-components";

import { ReactComponent as HeartSVG } from "../../../assets/icons/heart.svg";
import { Link } from "react-router-dom";
import { NumRatings, RatingValue } from "../starsRating/starsRating.style";
import colors from "../../../colors";

export const TourPictureContainer = styled.div`
  width: 100%;
  -webkit-clip-path: polygon(0 0, 100% 0%, 100% 86%, 0% 98%);
  clip-path: polygon(0 0, 100% 0%, 100% 86%, 0% 98%);
  height: 22rem;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  overflow: hidden;

  @media (max-width: 530px) {
    height: 12rem;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
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
  background-color: ${colors.backgroundLight};
  -webkit-box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.1);
  box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.1);
  transition: 0.3s all;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
    color: ${colors.darkGrey};
  }

  @media (max-width: 530px) {
    width: 20rem;
    gap: 1.2rem;
    border-radius: 8px;
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
    fill: ${colors.primary};
  }
  .fill {
    fill: rgba(204, 112, 75, 0.32);
    transition: all 0.3s;
  }

  &:hover {
    .fill {
      fill: ${colors.primary};
    }
  }

  ${({ inWishList }) =>
    inWishList &&
    css`
      .fill {
        fill: ${colors.primary};
      }
    `}

  @media (max-width: 530px) {
    width: 2rem;
    height: 2rem;
  }
`;

export const TourTitleWrapper = styled.div`
  position: absolute;
  right: 1.2rem;
  top: 12.8rem;
  height: 12rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;

  @media (max-width: 530px) {
    right: 0.8rem;
    top: 4.6rem;
  }
`;

export const TourTitle = styled.h3`
  width: 80%;
  color: ${colors.backgroundLight};

  text-transform: uppercase;
  font-weight: 300;
  letter-spacing: 1px;
  font-size: 2.5rem;
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
      from(${colors.primaryLight2}),
      to(${colors.primary})
    );

    background-image: -webkit-gradient(
      linear,
      left top,
      right bottom,
      from(${colors.primaryLight}),
      to(${colors.primary})
    );
  }

  @media (max-width: 530px) {
    font-size: 1.6rem;
    width: 85%;

    span {
      padding: 0.2rem 0.6rem;
    }
  }
`;

export const TourContent = styled.div`
  padding: 1.4rem 2.4rem 0 2.4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  margin-bottom: -1rem;

  @media (max-width: 530px) {
    gap: 0.4rem;
    padding: 1rem 1.6rem 0 1.6rem;
  }
`;

export const TourNextDate = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  text-transform: uppercase;
  color: ${colors.primary};

  @media (max-width: 530px) {
    font-size: 1.2rem;
  }
`;

export const TourTags = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

export const TourTag = styled.p`
  background-color: ${colors.primaryLight2};
  color: ${colors.white};
  font-size: 1.2rem;
  line-height: 1.6rem;
  letter-spacing: 0.2px;
  font-weight: 500;
  padding: 0.2rem 0.8rem;
  border-radius: 8px;

  @media (max-width: 530px) {
    font-size: 1rem;
    line-height: 1.2srem;
  }
`;

export const TourInfos = styled.div`
  margin-top: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  gap: 1.8rem;

  @media (max-width: 530px) {
    row-gap: 0.6rem;
    column-gap: 0.4rem;
  }
`;

export const Info = styled.div`
  display: flex;
  gap: 1.2rem;

  @media (max-width: 530px) {
    gap: 0.6rem;

    svg {
      width: 1.4rem !important;
      height: 1.4rem !important;
    }
  }
`;

export const InfoText = styled.p`
  font-size: 1.2rem;
  letter-spacing: 0.4px;

  @media (max-width: 530px) {
    font-size: 1.1rem;
    letter-spacing: 0.2px;
  }
`;

export const TourFooter = styled.div`
  margin-top: 1rem;
  padding: 1.6rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 1.4rem;
  background-color: ${colors.background};
  border-top: 1.8px solid ${colors.primaryVeryLight};
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;

  .ant-rate {
    gap: 0.6rem;
  }

  .ant-rate .ant-rate-star-first .anticon,
  .ant-rate .ant-rate-star-second .anticon {
    font-size: 2rem;
  }

  @media (max-width: 530px) {
    margin-top: 0.4rem;
    padding: 1rem 1.6rem;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    gap: 0.6rem;
    .ant-rate {
      gap: 0.4rem;
    }

    .ant-rate .ant-rate-star-first .anticon,
    .ant-rate .ant-rate-star-second .anticon {
      font-size: 1.6rem;
    }

    & ${RatingValue} {
      font-size: 1.2rem;
      line-height: 1.2rem;
    }

    & ${NumRatings} {
      font-size: 1rem;
      line-height: 1.2rem;
    }
  }
`;

export const Price = styled.p`
  font-size: 1.3rem;
  font-weight: 500;
  letter-spacing: 0.2px;

  span {
    font-size: 1.5rem;
    font-weight: 600;
  }

  @media (max-width: 530px) {
    font-size: 1.1rem;

    span {
      font-size: 1.3rem;
    }
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
  color: ${colors.white};
`;

export const CornerBannner = styled.div`
  color: ${colors.white};
  background-color: ${colors.smallLightGrey};
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
