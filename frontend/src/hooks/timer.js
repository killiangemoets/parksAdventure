import { useEffect, useState } from "react";

const useTimer = ({ max, time }) => {
  const [currentNumber, setCurrentNumber] = useState(1);

  useEffect(() => {
    // exit early when we reach 0
    // if (!timeLeft) return;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setCurrentNumber(currentNumber < max ? currentNumber + 1 : 1);
    }, time * 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [currentNumber]);

  return currentNumber;
};

export default useTimer;
