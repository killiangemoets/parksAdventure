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

  & > * {
    padding: 6.4rem 10vw 6.4rem 8vw;
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
  /* justify-content: center; */
`;
export const TourInfosLeftWrapper = styled.div`
  /* padding: 12rem; */
  display: flex;
  flex-direction: column;
  gap: 4.8rem;
`;

export const TourInfosRight = styled.div`
  /* width: 50%; */
  max-width: 70rem;
`;
