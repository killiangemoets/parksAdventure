import { useEffect, useState } from "react";
import { TAvailability } from "../types/tour";

type DatesFromAvailabilities = {
  availableDates: Date[];
  cheapestDates: Date[];
  lastSpotsDates: Date[];
};

const useDatesFromAvailabilities = ({
  availabilities,
}: {
  availabilities: TAvailability[] | undefined;
}): DatesFromAvailabilities => {
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [cheapestDates, setCheapestDates] = useState<Date[]>([]);
  const [lastSpotsDates, setLastSpotsDates] = useState<Date[]>([]);

  useEffect(() => {
    if (!availabilities) return;
    let newAvailableDates: Date[] = [];
    let cheapestDates: Date[] = [];
    let lastSpotsDates: Date[] = [];
    let minPrice = Infinity;
    availabilities.forEach((availability) => {
      if (new Date(availability.date) > new Date(Date.now())) {
        newAvailableDates.push(availability.date);
      }
      if (
        availability.price < minPrice &&
        new Date(availability.date) > new Date(Date.now())
      ) {
        // if (availability.price < minPrice) {
        cheapestDates = [availability.date];
        minPrice = availability.price;
      } else if (availability.price === minPrice) {
        cheapestDates.push(availability.date);
      }
      if (
        availability.maxGroupSize - availability.currentGroupSize <= 5 &&
        new Date(availability.date) > new Date(Date.now())
      ) {
        lastSpotsDates.push(availability.date);
      }
    });

    setAvailableDates(newAvailableDates);
    setCheapestDates(cheapestDates);
    setLastSpotsDates(lastSpotsDates);
  }, [availabilities]);

  return { availableDates, cheapestDates, lastSpotsDates };
};

export default useDatesFromAvailabilities;