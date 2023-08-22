import styled from "styled-components";
import colors from "../../../colors";

export const TourInfosContainer = styled.div`
  background-color: ${colors.backgroundVeryDark};

  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 100%;

  & > * {
    padding: 6.4rem 16rem 6.4rem 16rem;
    width: 100%;
    -webkit-box-flex: 0;
    -ms-flex: 0 0 50%;
    flex: 0 0 50%;
  }

  @media (max-width: 925px) {
    & > * {
      padding: 6.4rem 14rem 6.4rem 12rem;
    }
  }
  @media (max-width: 805px) {
    & > * {
      padding: 6.4rem 12rem 6.4rem 9rem;
    }
  }
  @media (max-width: 725px) {
    & > * {
      padding: 6.4rem 9rem 6.4rem 6.4rem;
    }
  }
  @media (max-width: 660px) {
    & > * {
      padding: 6.4rem 15.4rem 6.4rem 12.8rem;
    }
    flex-direction: column;
    padding: 0;
  }
  @media (max-width: 470px) {
    & > * {
      padding: 6.4rem 9rem 6.4rem 6.4rem;
    }
  }
`;

export const TourInfosLeft = styled.div`
  justify-content: flex-end;
  background-color: ${colors.backgroundMediumDark};

  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;

  @media (max-width: 660px) {
    justify-content: flex-start;
    width: 100%;
  }
`;
export const TourInfosLeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4.8rem;
`;

export const TourInfosRight = styled.div`
  width: 100%;
  max-width: 70rem;
`;
