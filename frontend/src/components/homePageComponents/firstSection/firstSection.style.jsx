import styled from "styled-components";

export const FirstSecContainer = styled.div`
  padding: 7.2rem 6.4rem;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7.2rem;
`;

export const FirstSecTitle = styled.h2`
  color: #506044;
  /* color: #CC704B; */
  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#738069),
    to(#48563d)
  );
  background-image: linear-gradient(to right, #738069, #48563d);
  -webkit-background-clip: text;
  color: transparent;
  font-size: 3.6rem;
  letter-spacing: 2px;
`;

export const FirstSectionContentWrapper = styled.div`
  max-width: 100rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const FirstSecElement = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3.6rem;
`;

export const ElementTitle = styled.h4`
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 1px;
  /* letter-spacing: 2px; */
  text-align: center;
  color: #506044;
  /* color: #CC704B; */
`;

export const ElementIconContainer = styled.div`
  img {
    width: 16rem;
  }
`;
