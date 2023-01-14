import styled from "styled-components";

export const ThirdSecContainer = styled.div`
  padding: 7.2rem 6.4rem;
  display: flex;
  justify-content: center;
`;

export const ThirdSecWrapper = styled.div`
  max-width: 130rem;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7.2rem;
`;

export const ThirdSecElement = styled.div`
  display: flex;
  /* align-items: center; */
  justify-content: center;
  gap: 6.4rem;
`;

export const ThirdSecTextContent = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

export const ElementTitle = styled.h4`
  margin-top: 0.8rem;
  font-size: 2.2rem;
  letter-spacing: 1px;

  font-weight: 700;
  /* letter-spacing: 2px; */
  /* text-align: center; */
  /* color: #cc704b; */
  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#d17e5d),
    to(#a35a3c)
  );
  background-image: linear-gradient(to right, #d17e5d, #a35a3c);
  -webkit-background-clip: text;
  color: transparent;
  -webkit-background-clip: text;
  color: transparent;
`;

export const ElementText = styled.p`
  font-size: 1.4rem;
  letter-spacing: 0.2px;
  word-spacing: 1px;
  font-weight: 500;
  text-align: justify;
`;

export const ThirdSecImageContent = styled.div`
  width: 50%;
  img {
    width: 100%;
    /* border-radius: 8px; */
  }
`;
