import styled from "styled-components";

export const BaseButton = styled.button`
  min-width: 16rem;
  padding: 1.2rem 3.2rem;

  font-size: 1.8rem;
  letter-spacing: 1px;
  /* font-weight: 600; */
  background-color: #cc704b;
  color: #faf2e5;
  border-radius: 999px;
  cursor: pointer;
  border: none;

  transition: all 0.3s;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  &:hover {
    background-color: #b86544;
  }
`;

export const EmptyButton = styled(BaseButton)`
  border: solid 2px #cc704b;
  background: none;
  color: #cc704b;
  transition: all 0.5s;

  &:hover {
    background-color: #cc704b;
    color: #fff;
  }
`;

export const InputButton = styled(BaseButton)`
  border: 1px solid #ccc;
  padding: 1.1rem 3.6rem;
`;
