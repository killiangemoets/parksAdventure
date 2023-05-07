import styled from "styled-components";

export const Filters = styled.div`
  /* padding: 0rem 6.4rem 0rem 6.4rem; */
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;
export const FilterElement = styled.div`
  display: flex;
  /* align-items: center; */
  gap: 2.8rem;
`;
export const FilterTitle = styled.h2`
  width: 16rem;
  font-size: 2rem;
  font-weight: 600;
  letter-spacing: 0.6px;
  color: #506044;
  text-transform: uppercase;
`;
export const Filter = styled.div`
  /* height: 2rem; */
  min-width: 30rem;

  /* background-color: #506044; */
`;

export const FilterCheckBoxes = styled(Filter)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ButtonSection = styled.div`
  /* padding: 1rem 6.4rem 4.8rem 6.4rem; */
  /* padding: 1.6rem 0rem 4.8rem 0rem; */

  display: flex;
  justify-content: space-between;
`;
