import axios from "axios";
import { TCreateStop } from "../../types/tour";

const getDirection = async (
  stops: TCreateStop[]
): Promise<[number, number][]> => {
  if (stops.length < 2) return [];

  try {
    let stopsToString = (
      stops.reduce((acc, stop) => {
        return acc + `${stop.longitude},${stop.latitude};`;
      }, "") + `${stops[0].longitude},${stops[0].latitude};`
    ).slice(0, -1);

    const directions = await axios(
      `https://api.mapbox.com/directions/v5/mapbox/walking/${stopsToString}?access_token=pk.eyJ1Ijoia2lsbGlhbmdlbW9ldHMiLCJhIjoiY2xjZHIzOTI4MDF6MTNybjBwNXRnZjM1YyJ9.6KlAze9wPLj3rmb2ykhgdQ&geometries=geojson`
    );
    return directions.data.routes[0].geometry.coordinates;
  } catch (error) {
    return [];
  }
};

export default getDirection;
