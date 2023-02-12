import { useEffect, useState } from "react";

const useTimer = ({ max, time }: { max: number; time: number }): number => {
  const [currentNumber, setCurrentNumber] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentNumber(currentNumber < max ? currentNumber + 1 : 1);
    }, time * 1000);
    return () => clearInterval(intervalId);
  }, [currentNumber, max, time]);

  return currentNumber;
};

export default useTimer;
