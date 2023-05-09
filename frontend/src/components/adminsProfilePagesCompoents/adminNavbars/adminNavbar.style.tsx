import styled from "styled-components";

export const AdminNavbarContainer = styled.div`
  position: relative;
  width: 100%;
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
  /* justify-content: space-between; */
  border-bottom: 1px solid #cc704b;
  background-color: #fdfaf5;
  padding: 0 6.4rem;
`;

export const AdminNavbarCenterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;
export const AdminNavbarRightContainer = styled.div`
  position: absolute;
  right: 6.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;
export const AdminNavbarLeftContainer = styled.div`
  position: absolute;
  left: 6.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

export const FixAdminTourNavbar = styled.div`
  padding-top: 8rem;
  position: fixed;
  left: 0%;
  width: 100vw;
  z-index: 9;
`;
