import styled from "styled-components";

export const FirstSecContainer = styled.div`
  padding: 7.2rem 6.4rem;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7.2rem;

  h2 {
    background-image: -webkit-gradient(
      linear,
      left top,
      right top,
      from(#738069),
      to(#48563d)
    );
    background-image: linear-gradient(to right, #738069, #48563d);
  }
`;

export const FirstSectionContentWrapper = styled.div`
  max-width: 120rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const FirstSecElementInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  height: 24rem;
  width: 36rem;
`;

export const FirstSecElement = styled.div`
  background-color: transparent;

  perspective: 1000px;

  &:hover {
    & ${FirstSecElementInner} {
      transform: rotateY(180deg);
    }
  }
`;

export const FirstSecElementFront = styled.div`
  border-radius: 12px;
  background-color: #fefdfa;
  background-color: #fdfaf5;
  background: no-repeat left center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

  -webkit-box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.1);
  box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.1);
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3.6rem;
`;

export const FirstSecElementBack = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
  padding: 3.2rem;

  border-radius: 12px;
  background-color: #fefdfa;
  -webkit-box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.1);
  box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.1);
  position: absolute;

  backface-visibility: hidden;
  transform: rotateY(180deg);

  cursor: default;
`;

export const FrontTitle = styled.h4`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 2.4rem;
  font-weight: 700;
  letter-spacing: 1px;
  color: #fff;
  white-space: pre-line;
`;

export const BackTitle = styled.h4`
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 1px;
  white-space: pre-line;
`;

export const BackText = styled.p`
  font-size: 1.4rem;
  line-height: 2.2rem;
  text-align: center;
  letter-spacing: 1px;

  span {
    font-weight: 700;
    color: #506044;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      color: #404d36;
    }
  }
`;
