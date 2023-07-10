import styled from "styled-components";

export const TopReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
  cursor: pointer;
`;

export const ReviewTitle = styled.h4`
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-align: center;
  text-transform: capitalize;
  max-width: 40rem;

  @media (max-width: 900px) {
    max-width: 30rem;
  }
  @media (max-width: 680px) {
    max-width: 24rem;
  }

  @media (max-width: 580px) {
    max-width: 100%;
  }
`;

export const ReviewDescription = styled.p`
  width: 60%;
  min-width: 38rem;
  font-size: 1.4rem;
  line-height: 2rem;
  letter-spacing: 0.2px;
  word-spacing: 1px;
  font-weight: 500;
  text-align: center;
  padding: 1rem 0 1.8rem 0;
  color: #666;

  @media (max-width: 900px) {
    min-width: 0rem;
  }

  @media (max-width: 680px) {
    max-width: 12rem;
  }
  @media (max-width: 580px) {
    max-width: none;
  }
`;

export const ReviewUser = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const UserName = styled.h5`
  min-width: 38rem;
  font-size: 1.4rem;
  line-height: 2rem;
  font-weight: 700;
  letter-spacing: 0.4px;
  word-spacing: 1px;
  text-align: center;
`;
