import { useEffect, useState } from "react";
import { TAvailability } from "../types/tour";

type DatesFromAvailabilities = {
  availableDates: Date[];
  cheapestDates: Date[];
  lastSpotsDates: Date[];
  soldoutDates: Date[];
};

const useDatesFromAvailabilities = ({
  availabilities,
}: {
  availabilities: TAvailability[] | undefined;
}): DatesFromAvailabilities => {
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [cheapestDates, setCheapestDates] = useState<Date[]>([]);
  const [lastSpotsDates, setLastSpotsDates] = useState<Date[]>([]);
  const [soldoutDates, setSoldoutDates] = useState<Date[]>([]);

  useEffect(() => {
    if (!availabilities) return;
    let newAvailableDates: Date[] = [];
    let cheapestDates: Date[] = [];
    let lastSpotsDates: Date[] = [];
    let soldoutDates: Date[] = [];
    let minPrice = Infinity;
    availabilities.forEach((availability) => {
      if (
        new Date(availability.date) > new Date(Date.now()) &&
        availability.maxGroupSize - availability.currentGroupSize > 0
      ) {
        newAvailableDates.push(availability.date);
      }
      if (
        availability.price < minPrice &&
        new Date(availability.date) > new Date(Date.now())
      ) {
        cheapestDates = [availability.date];
        minPrice = availability.price;
      } else if (availability.price === minPrice) {
        cheapestDates.push(availability.date);
      }

      if (
        availability.maxGroupSize - availability.currentGroupSize === 0 &&
        new Date(availability.date) > new Date(Date.now())
      ) {
        soldoutDates.push(availability.date);
      } else if (
        availability.maxGroupSize - availability.currentGroupSize <= 5 &&
        new Date(availability.date) > new Date(Date.now())
      ) {
        lastSpotsDates.push(availability.date);
      }
    });

    setAvailableDates(newAvailableDates);
    setCheapestDates(cheapestDates);
    setLastSpotsDates(lastSpotsDates);
    setSoldoutDates(soldoutDates);
  }, [availabilities]);

  return { availableDates, cheapestDates, lastSpotsDates, soldoutDates };
};

export default useDatesFromAvailabilities;
