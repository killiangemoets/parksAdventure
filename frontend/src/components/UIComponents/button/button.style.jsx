import styled from "styled-components";

export const BaseButton = styled.button`
  min-width: 16rem;
  padding: 1.2rem 3.2rem;

  font-size: 1.8rem;
  letter-spacing: 1px;
  background-color: #cc704b;
  border: solid 2px #cc704b;
  color: #faf2e5;
  border-radius: 999px;
  cursor: pointer;

  transition: all 0.3s;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  &:hover {
    background-color: #b86544;
    border: solid 2px #b86544;
  }
`;

export const InvertedButton = styled(BaseButton)`
  border: solid 2px #cc704b;
  background: none;
  color: #cc704b;
  transition: all 0.5s;

  &:hover {
    border: solid 2px #cc704b;
    background-color: #cc704b;
    color: #fff;
  }
`;

export const InputButton = styled(BaseButton)`
  border: 1px solid #ccc;
  padding: 1.1rem 3.6rem;

  &:hover {
    border: 1px solid #ccc;
  }
`;

export const EmptyButton = styled.button`
  padding: 0;
  font-size: 1.8rem;
  letter-spacing: 1px;
  background: none;
  color: #cc704b;
  cursor: pointer;
  border: none;
  transition: all 0.3s;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  &:hover {
    color: #b86544;
  }
`;

export const GalleryButton = styled(InvertedButton)`
  border-radius: 8px;
  padding: 0.8rem 1.2rem;
  background-color: rgba(250, 242, 229, 0.4);
  .stroke,
  .path {
    fill: #cc704b;
    transition: all 0.3s;
  }
  .fill {
    fill: rgba(204, 112, 75, 0);
  }

  &:hover {
    color: #cc704b;
    background-color: rgba(250, 242, 229, 0.6);
  }
`;
