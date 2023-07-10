import styled from "styled-components";

import { ReactComponent as FilterSVG } from "../../../assets/filter.svg";
import { ReactComponent as SortSVG } from "../../../assets/sort-solid.svg";
import { CarouselSwiper } from "../../UIComponents/carousel/carousel.style";

export const SearchFiltersContainer = styled.div`
  width: 100%;
  height: 12rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #cc704b;
  background-color: #fdfaf5;
`;

export const SearchFiltersWrapper = styled.div`
  width: 100%;
  max-width: 160rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2.8rem;

  @media (max-width: 1220px) {
    & button {
      padding: 1.2rem 2.4rem;
      font-size: 1.4rem;
      font-weight: 600 !important;
      white-space: nowrap;
    }
  }

  @media (max-width: 708px) {
    justify-content: end;
  }
  @media (max-width: 600px) {
    justify-content: center;
  }
`;

export const Categories = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  & ${CarouselSwiper} {
    padding: 0 4.8rem;
  }

  height: calc((56vw / 3) * 2);
  transform: scale(1);

  .swiper {
    .swiper-button-next,
    .swiper-button-prev {
      position: fixed;
      top: 44.6%;
      color: #cc704b;
      transition: all 0.3s;
      background-color: #fdfaf5;
      padding: 4rem 2rem;

      &:hover {
        color: #b86544;
      }
    }

    .swiper-button-prev {
      transform: translateX(-160%);
    }
    .swiper-button-next {
      transform: translateX(160%);
    }
  }

  .swiper-backface-hidden .swiper-slide {
    width: fit-content !important;
  }

  @media (max-width: 1040px) {
    width: 68%;
  }
  @media (max-width: 920px) {
    .swiper {
      .swiper-button-next,
      .swiper-button-prev {
        top: 43.8%;
      }
    }
  }
  @media (max-width: 880px) {
    width: 60%;

    .swiper {
      .swiper-button-next,
      .swiper-button-prev {
        top: 43.6%;
      }
    }
  }
  @media (max-width: 800px) {
    .swiper {
      .swiper-button-next,
      .swiper-button-prev {
        top: 43%;
      }
    }
  }
  @media (max-width: 710px) {
    width: 53.2%;
  }

  @media (max-width: 708px) {
    display: none;
  }
`;

export const Filters = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

export const FilterIcon = styled(FilterSVG)`
  width: 2.2rem;
  height: 2.2rem;
`;
export const SortIcon = styled(SortSVG)`
  width: 2rem;
  height: 2rem;
`;
