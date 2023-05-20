import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import RangeDateInput from "../../UIComponents/rangeDateInput/rangeDateInput.component";
import SearchInput from "../../UIComponents/searchInput/searchInput.component";
import {
  AllToursHeaderContainer,
  AllToursHeaderContent,
  AllToursHeaderInputs,
  AllToursHeaderWrapper,
  AllToursMainTitle,
  AllToursSecondTitle,
  AllToursTitles,
} from "./allToursHeader.style";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import isValidDate from "../../../utils/formatting/validDate";

export type AllTourHeaderProps = {
  forwardRef?: React.MutableRefObject<HTMLDivElement | null>;
};

const AllToursHeader: FC<AllTourHeaderProps> = ({ forwardRef }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>("");
  const [dates, setDates] = useState<[Dayjs, Dayjs] | null>(null);

  useEffect(() => {
    const searchParam = searchParams.get("search");
    if (searchParam) setSearch(searchParam);

    const dateFromParam = searchParams.get("date[gte]");
    const dateToParam = searchParams.get("date[lte]");
    if (
      dateFromParam &&
      dateToParam &&
      isValidDate(new Date(dateFromParam)) &&
      isValidDate(new Date(dateToParam))
    ) {
      setDates([dayjs(dateFromParam), dayjs(dateToParam)]);
    }
  }, [searchParams]);

  const handleSearch = () => {
    if (search.length) searchParams.set("search", search.toLowerCase().trim());
    else searchParams.delete("search");
    searchParams.delete("page");
    setSearchParams(searchParams);
  };
  const handleDeleteSearch = () => {
    setSearch("");
    searchParams.delete("search");
    searchParams.delete("page");
    setSearchParams(searchParams);
  };

  const handleChangeDates = (newDates: any) => {
    setDates(newDates);
    if (newDates) {
      searchParams.set("date[gte]", newDates[0].format("YYYY-MM-DD"));
      searchParams.set("date[lte]", newDates[1].format("YYYY-MM-DD"));
      searchParams.delete("page");
    } else {
      searchParams.delete("date[gte]");
      searchParams.delete("date[lte]");
      searchParams.delete("page");
    }
    setSearchParams(searchParams);
  };

  return (
    <AllToursHeaderContainer ref={forwardRef} className="header">
      <AllToursHeaderWrapper>
        <AllToursHeaderContent>
          <AllToursHeaderInputs>
            <SearchInput
              placeholder="tour name, location, ..."
              handleSubmit={handleSearch}
              handleDelete={handleDeleteSearch}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <RangeDateInput
              currentValues={dates}
              handleChange={handleChangeDates}
            />
          </AllToursHeaderInputs>
          <AllToursTitles>
            <AllToursSecondTitle>All Tours</AllToursSecondTitle>
            <AllToursMainTitle>Find your next adventure</AllToursMainTitle>
          </AllToursTitles>
        </AllToursHeaderContent>
      </AllToursHeaderWrapper>
    </AllToursHeaderContainer>
  );
};

export default AllToursHeader;
