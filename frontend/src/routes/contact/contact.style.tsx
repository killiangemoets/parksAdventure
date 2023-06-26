import styled from "styled-components";

export const ContactContainer = styled.div`
  min-height: calc(100vh - 8rem);
  padding: 6.4rem;
  padding-top: calc(6.4rem + 8rem);
  display: flex;
  gap: 10rem;
  justify-content: center;
`;

export const ContactLeftContent = styled.div`
  width: 52rem;
  display: flex;
  flex-direction: column;
  gap: 4.8rem;
`;

export const ContactLeftSection = styled.div`
  width: 52rem;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;

export const ContactImage = styled.div`
  img {
    width: 100%;
    border-radius: 2px;
  }
`;

export const ContactText = styled.p`
  font-size: 1.8rem;
  letter-spacing: 0.2px;
  font-weight: 500;
  text-align: justify;

  span {
    font-weight: 700;
  }
`;

export const ContactBoldText = styled(ContactText)`
  font-weight: 700;
`;

export const ContactMainText = styled.p`
  color: #cc704b;
  font-size: 2.4rem;
  letter-spacing: 1px;
  font-weight: 600;
  text-align: justify;
`;
