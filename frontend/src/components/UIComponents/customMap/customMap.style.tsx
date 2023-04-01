import styled from "styled-components";
import { Popup } from "react-map-gl";

export const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const InfoPopup = styled(Popup)`
  margin-top: -3.6rem;
  width: auto;
  height: auto;
  max-width: none !important;
`;
