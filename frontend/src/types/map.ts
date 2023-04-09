import { ReactNode } from "react";

export type TCoordinates = [number, number];

export type TLocation = {
  coordinates: TCoordinates;
  popupContent?: string | ReactNode;
  highlight?: boolean;
};

export type TCoordinatesBox = {
  northeast: TCoordinates;
  southwest: TCoordinates;
};

export type TViewState = {
  longitude: number;
  latitude: number;
  zoom: number;
};
