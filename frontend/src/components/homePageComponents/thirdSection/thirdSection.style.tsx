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

  .box-left {
    transition: all 0.8s ease;
    /* opacity: 0; */
    transform: translateX(-200%);
  }

  .box-right {
    transition: all 0.8s ease;
    opacity: 0;
    transform: translateX(200%);
  }

  .box.show {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const ThirdSecTextContent = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
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
