import styled from "styled-components";

import { ReactComponent as HeartSVG } from "../../../assets/icons/heart.svg";
import { NumRatings, RatingValue } from "../starsRating/starsRating.style";
import colors from "../../../colors";

export const TourPictureContainer = styled.div`
  width: 100%;
  -webkit-clip-path: polygon(0 0, 100% 0%, 100% 86%, 0% 98%);
  clip-path: polygon(0 0, 100% 0%, 100% 86%, 0% 98%);
  height: 16rem;
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

export const TourPopupContainer = styled.div`
  position: relative;
  cursor: pointer;
  width: 30rem;
  border-radius: 12px;
  background-color: ${colors.backgroundLight};
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

  @media (max-width: 530px) {
    width: 22rem;
    gap: 1.2rem;
    border-radius: 8px;
  }
`;

export const WishListIcon = styled(HeartSVG)`
  width: 2.4rem;
  height: 2.4rem;
  cursor: pointer;
  .stroke {
    fill: ${colors.primary};
  }
  .fill {
    fill: rgba(204, 112, 75, 0.4);
    transition: all 0.3s;
  }

  &:hover {
    .fill {
      fill: ${colors.primary};
    }
  }

  @media (max-width: 530px) {
    width: 2rem;
    height: 2rem;
  }
`;

export const TourTitle = styled.h3`
  position: absolute;
  right: 1.6rem;
  top: 10.8rem;
  width: 70%;
  color: ${colors.backgroundLight};

  text-transform: uppercase;
  font-weight: 300;
  letter-spacing: 1px;
  font-size: 2.2rem;
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
      from(${colors.primaryLight}),
      to(${colors.primary})
    );
  }

  @media (max-width: 530px) {
    font-size: 1.6rem;
    right: 0.8rem;
    top: 8.8rem;
    width: 80%;

    span {
      padding: 0.4rem 0.6rem;
    }
  }
`;

export const TourContent = styled.div`
  padding: 1.2rem 2.4rem 0 2.4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.6rem;
  margin-bottom: -1rem;

  @media (max-width: 530px) {
    gap: 0.4rem;
    padding: 1.2rem 1.6rem 0 1.6rem;
  }
`;

export const TourNextDate = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  text-transform: uppercase;
  color: ${colors.primary};

  @media (max-width: 530px) {
    font-size: 1rem;
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
  gap: 1.2rem;

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
  font-size: 1.1rem;
  line-height: 1.6rem;
  letter-spacing: 0.4px;

  @media (max-width: 530px) {
    letter-spacing: 0.2px;
  }
`;

export const TourFooter = styled.div`
  margin-top: 1rem;
  padding: 1.6rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 1rem;
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
