import styled from "styled-components";
import colors from "../../../colors";

export const ItineraryLineContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-direction: column;
  justify-content: center;
`;

export const Line = styled.div`
  margin-left: 0.99rem;
  width: 0.4rem;
  height: 3.2rem;
  background-color: ${colors.primary};
  border-radius: 999px;
`;
