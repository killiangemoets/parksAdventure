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

const AllToursHeader = () => {
  return (
    <AllToursHeaderContainer>
      <AllToursHeaderWrapper>
        <AllToursHeaderContent>
          <AllToursHeaderInputs>
            <SearchInput />
            <RangeDateInput />
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
