import styled from "styled-components";

export const PersonalDetailsContainer = styled.div`
  padding: 2rem 2.4rem;
  border: 3px solid #cc704b;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const PersonalDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const Name = styled.p`
  font-weight: 700;
  font-size: 1.6rem;
  letter-spacing: 1px;
`;

export const ContactInfo = styled.p`
  font-weight: 400;
  font-size: 1.6rem;
  letter-spacing: 1px;
`;

export const ModalFooterNote = styled.p`
  text-align: center;
  font-weight: 400;
  font-size: 1.4rem;
  letter-spacing: 0.2px;
`;
