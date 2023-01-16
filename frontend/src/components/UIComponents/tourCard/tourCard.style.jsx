import styled from "styled-components";

import { ReactComponent as PositionSVG } from "../../../assets/location-dot-solid.svg";
import { ReactComponent as TentSVG } from "../../../assets/campground-solid.svg";
import { ReactComponent as DifficultySVG } from "../../../assets/arrow-up-right-dots-solid.svg";
import { ReactComponent as GroupSVG } from "../../../assets/users-solid.svg";
import { ReactComponent as HeartSVG } from "../../../assets/heart.svg";

import TourBackground from "../../../assets/tour-bg.jpg";

export const TourPictureContainer = styled.div`
  width: 100%;
  -webkit-clip-path: polygon(0 0, 100% 0%, 100% 86%, 0% 98%);
  clip-path: polygon(0 0, 100% 0%, 100% 86%, 0% 98%);
  height: 22rem;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  overflow: hidden;
`;
export const TourPicture = styled.div`
  width: 100%;
  height: 100%;
  background: url(${TourBackground}) no-repeat left center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  position: relative;
  background-position: center;
  transition: transform 0.3s cubic-bezier(0.25, 0.45, 0.45, 0.95);
`;

export const TourCardContainer = styled.div`
  position: relative;
  cursor: pointer;
  width: 32rem;
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

export const WishListIcon = styled(HeartSVG)`
  width: 2.4rem;
  height: 2.4rem;
  cursor: pointer;
  .stroke {
    fill: #cc704b;
  }
  .fill {
    fill: rgba(204, 112, 75, 0.4);
    transition: all 0.3s;
  }

  &:hover {
    .fill {
      fill: #cc704b;
    }
  }
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
export const TourDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.4rem;
  letter-spacing: 0.2px;
  font-style: italic;
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
  align-items: center;
  /* justify-content: center; */
  gap: 1.2rem;
`;

export const InfoText = styled.p`
  font-size: 1.2rem;
  letter-spacing: 0.4px;
`;

export const PositionIcon = styled(PositionSVG)`
  width: 2rem;
  height: 2rem;
`;
export const TentIcon = styled(TentSVG)`
  width: 2rem;
  height: 2rem;
`;
export const DifficultyIcon = styled(DifficultySVG)`
  width: 2rem;
  height: 2rem;
`;
export const GroupIcon = styled(GroupSVG)`
  width: 2rem;
  height: 2rem;
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
