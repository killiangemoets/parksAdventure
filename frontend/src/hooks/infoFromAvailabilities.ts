import { useEffect, useState } from "react";
import { TAvailability } from "../types/tour";
import niceDate from "../utils/formatting/formatDates";

type InfosFromAvailabilities = {
  nextStart: string | null;
  maxGroupSize: string;
  minGroupSize: string;
  minPrice: string;
};

const useInfoFromAvailabilities = ({
  availabilities,
}: {
  availabilities: TAvailability[];
}): InfosFromAvailabilities => {
  const [nextStart, setNextStart] = useState<string | null>(null);
  const [maxGroupSize, setMaxGroupSize] = useState<string>("");
  const [minGroupSize, setMinGroupSize] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");

  useEffect(() => {
    if (availabilities && availabilities.length > 0) {
      let newStart: Date | null = null;
      let newMaxGroupSize = availabilities[0].maxGroupSize;
      let newMinGroupSize = availabilities[0].maxGroupSize;
      let newMinPrice = availabilities[0].price;

      availabilities.forEach((availability) => {
        if (new Date(availability.date) > new Date(Date.now())) {
          if (!newStart) newStart = availability.date;
          else if (availability.date < newStart) newStart = availability.date;
        }
        if (availability.maxGroupSize > newMaxGroupSize)
          newMaxGroupSize = availability.maxGroupSize;
        if (availability.maxGroupSize < newMinGroupSize)
          newMinGroupSize = availability.maxGroupSize;
        if (availability.price < newMinPrice) newMinPrice = availability.price;
      });

      newStart && setNextStart(niceDate(newStart));
      setMaxGroupSize(newMaxGroupSize.toString());
      setMinGroupSize(newMinGroupSize.toString());
      setMinPrice(newMinPrice.toString());
    }
  }, [availabilities]);

  return { nextStart, maxGroupSize, minGroupSize, minPrice };
};

export default useInfoFromAvailabilities;
