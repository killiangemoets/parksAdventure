import styled from "styled-components";
import allToursHeaderBackground from "../../../assets/alltours-header-bg.webp";

export const AllToursHeaderContainer = styled.div`
  width: 100vw;
  height: 40rem;
  background: url(${allToursHeaderBackground}) no-repeat left center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  position: relative;
`;
export const AllToursHeaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(159, 192, 136, 0.16);
  display: flex;
  /* align-items: center; */
  justify-content: center;
`;
export const AllToursHeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.6rem;
`;

export const AllToursHeaderInputs = styled.div`
  padding-top: 4.8rem;
  /* height: 8rem; */
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
  /* background-color: #f6e6cb; */
`;

export const AllToursTitles = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
  gap: 1rem;
`;

export const AllToursSecondTitle = styled.h2`
  color: #faf2e5;
  font-size: 2.2rem;
  letter-spacing: 1.2px;
  text-shadow: 1px 8px 8px rgba(0, 0, 0, 0.32);
`;

export const AllToursMainTitle = styled.h1`
  font-weight: 700;
  text-transform: uppercase;
  font-size: 3.6rem;
  letter-spacing: 1.2px;
  color: #faf2e5;
  text-shadow: 1px 8px 8px rgba(0, 0, 0, 0.32);
`;
