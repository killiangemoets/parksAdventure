import styled from "styled-components";

export const UserWishListContainer = styled.div`
  min-height: calc(100vh - 8rem);
  padding: calc(8rem + 6.4rem) 6.4rem 0 6.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  h2 {
    padding-bottom: 6.4rem;
  }
`;

export const WishListCards = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 3.2rem;
  row-gap: 4.8rem;
`;
