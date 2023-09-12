import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const useHitBottomPagination = (numberOfPages: number) => {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchParams]);

  useEffect(() => {
    const handleScroll = () => {
      // document.documentElement.scrollHeight = height of the entire content of an HTML document
      // window.innerHeight = height of the viewport
      // window.scrollY == height of the scroll
      const bottom =
        window.innerHeight + window.scrollY + 10 >=
        document.documentElement.scrollHeight;

      if (bottom && currentPage < numberOfPages) {
        setCurrentPage((currentPage) => currentPage + 1);
      }
    };
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [numberOfPages, currentPage]);

  return currentPage;
};

export default useHitBottomPagination;
