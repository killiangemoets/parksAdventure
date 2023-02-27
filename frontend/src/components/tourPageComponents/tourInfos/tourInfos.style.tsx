import styled from "styled-components";

export const TourInfosContainer = styled.div`
  /* padding: 6.4rem; */
  /* width: 100vw; */
  /* display: flex; */
  /* align-items: center; */
  /* justify-content: center; */
  /* background-color: #faf2e5; */
  background-color: #fbf5ea;

  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 100%;

  & > * {
    /* padding: 6.4rem 8vw 6.4rem 8vw; */
    padding: 6.4rem 16rem 6.4rem 16rem;
    width: 100%;
    -webkit-box-flex: 0;
    -ms-flex: 0 0 50%;
    flex: 0 0 50%;
  }
`;

export const TourInfosLeft = styled.div`
  /* width: 50%; */
  /* display: flex; */
  justify-content: flex-end;
  background-color: #f9eedb;

  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  /* width: 100%; */

  /* justify-content: center; */
`;
export const TourInfosLeftWrapper = styled.div`
  /* padding: 12rem; */
  /* width: 100%; */

  display: flex;
  flex-direction: column;
  gap: 4.8rem;
`;

export const TourInfosRight = styled.div`
  /* width: 50%; */
  width: 100%;

  max-width: 70rem;
`;
