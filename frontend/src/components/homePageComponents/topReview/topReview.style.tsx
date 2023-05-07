import styled from "styled-components";

export const TopReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  gap: 1.6rem;
  cursor: pointer;

  /* cursor: grab; */
`;

export const ReviewTitle = styled.h4`
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-align: center;
  text-transform: capitalize;
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
