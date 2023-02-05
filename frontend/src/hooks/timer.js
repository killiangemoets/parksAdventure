import { useEffect, useState } from "react";

const useTimer = ({ max, time }) => {
  const [currentNumber, setCurrentNumber] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentNumber(currentNumber < max ? currentNumber + 1 : 1);
    }, time * 1000);
    return () => clearInterval(intervalId);
  }, [currentNumber]);

  return currentNumber;
};

export default useTimer;
