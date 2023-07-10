import styled from "styled-components";

/* #506044 
#9fc088
#CC704B
#b86544
#e0a993
#F6E6CB 
#faf2e5
##fdfaf5
*/

export const BaseButton = styled.button`
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
  width: auto;
  height: auto;
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

export const LightButton = styled(BaseButton)`
  background-color: #faf2e5;
  /* border: solid 2px #faf2e5; */
  border: 1px solid #aaa;
  color: #aaa;

  &:hover {
    background-color: #faf2e5;
    /* border: solid 2px #faf2e5; */
    border: 1px solid #aaa;
  }
`;

export const RectangularButton = styled(BaseButton)`
  width: 22rem;
  height: 4rem;
  padding: 0.4rem 1.8rem;

  font-size: 1.4rem;
  font-weight: 400;
  text-transform: capitalize;
  letter-spacing: 1px;

  color: #333;
  background-color: #f9eedb;
  border-radius: 4px;
  border: 1px solid #cc704b;

  &:hover {
    border: 1px solid #cc704b;
    background-color: #f9eedb;
  }
`;

export const CancelButton = styled(BaseButton)`
  border: solid 2px #cc704b;
  background: none;
  color: #cc704b;
  transition: all 0.5s;

  &:hover {
    background: none;
    border: solid 2px #b86544;
    color: #b86544;
  }
`;

export const DeleteButton = styled(BaseButton)`
  border: solid 2px #f9625b;
  background: none;
  color: #f9625b;

  transition: all 0.5s;

  &:hover {
    color: #fff;
    background: #f9625b;
    border: solid 2px #f9625b;
  }
`;

export const DeleteConfirmButton = styled(BaseButton)`
  border: solid 2px #f9625b;
  background: #f9625b;
  color: #fff;

  transition: all 0.5s;

  &:hover {
    border: solid 2px #f85149;
    background: #f85149;
    color: #fff;
  }
`;

export const DeleteCancelButton = styled(BaseButton)`
  border: solid 2px #f9625b;
  background: none;
  color: #f9625b;

  transition: all 0.5s;

  &:hover {
    border: solid 2px #f85149;
    background: none;
    color: #f85149;
  }
`;
