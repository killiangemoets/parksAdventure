import styled from "styled-components";
import colors from "../../colors";

export const ContactContainer = styled.div`
  min-height: calc(100vh - 8rem);
  padding: 6.4rem;
  padding-top: calc(6.4rem + 8rem);
  display: grid;
  grid-template-columns: repeat(2, auto);
  row-gap: 3.2rem;
  column-gap: 10rem;
  justify-content: center;

  @media (max-width: 1100px) {
    column-gap: 4.8rem;
  }

  @media (max-width: 1000px) {
    grid-template-columns: repeat(1, auto);
  }
`;

export const ContactLeftContent = styled.div`
  width: 52rem;
  display: flex;
  flex-direction: column;
  gap: 4.8rem;

  @media (max-width: 1000px) {
    width: 60rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 530px) {
    width: 100%;
  }
`;

export const ContactLeftSection = styled.div`
  width: 52rem;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;

  grid-column: 1/2;
  grid-row: 1/2;

  @media (max-width: 1000px) {
    width: 60rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 530px) {
    width: 100%;
  }
`;

export const ContactLeftSection2 = styled(ContactLeftSection)`
  grid-row: 2/3;

  @media (max-width: 1000px) {
    margin-top: 2rem;
    grid-row: 3/4;
  }
`;
export const ContactFormContainer = styled.div`
  grid-row: 1/3;

  @media (max-width: 1000px) {
    grid-row: 2/3;
  }
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

  @media (max-width: 1000px) {
    text-align: center;
  }

  @media (max-width: 530px) {
    font-size: 1.6rem;
  }
`;

export const ContactBoldText = styled(ContactText)`
  font-weight: 700;
`;

export const ContactMainText = styled.p`
  color: ${colors.primary};
  font-size: 2.4rem;
  letter-spacing: 1px;
  font-weight: 600;
  text-align: justify;

  @media (max-width: 530px) {
    font-size: 2rem;
  }
`;
