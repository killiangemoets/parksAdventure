import styled from "styled-components";

export const ReviewContainer = styled.div`
  width: 100%;
  padding: 3.2rem 0;
  border-bottom: 1px solid #aaa;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

export const ReviewInfos = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ReviewDate = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  text-transform: capitalize;
  letter-spacing: 1px;
  color: #aaa;
`;

export const ReviewContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ReviewText = styled.p`
  font-size: 1.4rem;
  line-height: 2.2rem;
  text-align: justify;
  letter-spacing: 1px;
`;

export const ReviewerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.8rem;
`;

export const ReviewerName = styled.p`
  font-weight: 600;
  margin-right: 2.25rem;
  text-transform: uppercase;
  font-size: 1.4rem;
  letter-spacing: 1px;
`;

export const EditButtons = styled.div`
  display: flex;
  gap: 1.8rem;
  justify-content: flex-end;
  margin-top: -1rem;

  button {
    min-width: 2rem;
    padding: 0;

    &:hover {
      text-decoration: underline;
    }
  }
`;
