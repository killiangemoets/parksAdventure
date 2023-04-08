import { ReactNode } from "react";

export type TCoordinates = [number, number];

export type TLocation = {
  coordinates: TCoordinates;
  popupContent?: string | ReactNode;
};

export type TCoordinatesBox = {
  northeast: TCoordinates;
  southwest: TCoordinates;
};
