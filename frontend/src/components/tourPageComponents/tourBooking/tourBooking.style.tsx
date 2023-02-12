import styled from "styled-components";

export const TourBookingContainer = styled.div`
  padding: 6.4rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TourBookingBox = styled.div`
  position: relative;
  padding: 3.2rem 2.4rem 3.2rem 20.4rem;
  border-radius: 12px;
  background: -webkit-gradient(
    linear,
    left top,
    right bottom,
    from(#506044),
    to(#627057)
  );
  background: linear-gradient(to right bottom, #506044, #627057);
  -webkit-box-shadow: 0 1.8rem 4.4rem rgba(0, 0, 0, 0.26);
  box-shadow: 0 1.8rem 4.4rem rgba(0, 0, 0, 0.26);
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

export const Titles = styled.div`
  margin-left: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SecondTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 400;
  text-transform: capitalize;
  letter-spacing: 1px;
  color: #fff;
`;

export const TourBookingPictures = styled.div`
  position: absolute;
  width: 18rem;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
`;

export const Picture1 = styled.div`
  position: absolute;
  z-index: 2;
  top: calc(50% - 7rem);
  left: -4.8rem;
`;

export const Picture2 = styled.div`
  position: absolute;
  z-index: 1;
  top: calc(50% - 7rem);
  left: -1rem;
`;

export const Picture3 = styled.div`
  position: absolute;
  top: calc(50% - 7rem);
  left: 2.8rem;
`;
