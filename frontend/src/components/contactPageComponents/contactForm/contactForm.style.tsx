import styled from "styled-components";

export const ContactFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4.2rem;
`;

export const ContactFormElement = styled.form`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 1.6rem;
`;

export const ContactInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4.8rem;

  input {
    min-width: 28rem;
  }

  @media (max-width: 530px) {
    width: 100%;
    gap: 2rem;
  }
`;

export const ContactSmallInputs = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 4.8rem;

  @media (max-width: 530px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;
