import styled from "styled-components";
import colors from "../../../colors";

export const MainTitle = styled.h1`
  width: fit-content;
  color: ${colors.secondary};
  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    from(${colors.secondaryMediumLight}),
    to(${colors.secondaryMedium})
  );
  background-image: linear-gradient(
    to right,
    ${colors.secondaryMediumLight},
    ${colors.secondaryMedium}
  );
  -webkit-background-clip: text;
  color: transparent;
  font-size: 3.6rem;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

export const SoftTitle = styled(MainTitle)`
  text-transform: none;
  font-weight: 700;
  text-align: center;
  font-size: 3rem;
`;

export const HomeSectionTitle = styled.h2`
  font-weight: 700;
  width: fit-content;
  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    from(${colors.primaryVariantLight}),
    to(${colors.primaryVariantDark})
  );
  background-image: linear-gradient(
    to right,
    ${colors.primaryVariantLight},
    ${colors.primaryVariantDark}
  );
  -webkit-background-clip: text;
  color: transparent;
  font-size: 3.6rem;
  letter-spacing: 2px;
  text-transform: capitalize;
`;

export const SectionTitle = styled.h2`
  width: fit-content;
  font-size: 2.4rem;
  text-transform: uppercase;
  font-weight: 700;
  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    from(${colors.primaryLight2}),
    to(${colors.primary})
  );
  background-image: linear-gradient(
    to right,
    ${colors.primaryLight2},
    ${colors.primary}
  );
  -webkit-background-clip: text;
  color: transparent;
  letter-spacing: 0.1rem;
  line-height: 1.3;
  display: inline-block;
`;

export const ThirdTitle = styled.h3`
  width: fit-content;
  text-transform: uppercase;
  -webkit-background-clip: text;
  color: transparent;
  letter-spacing: 0.1rem;
  line-height: 1.3;
  display: inline-block;

  font-size: 2rem;
  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    from(${colors.primaryMediumLight}),
    to(${colors.primary})
  );
  background-image: linear-gradient(
    to right,
    ${colors.primaryMediumLight},
    ${colors.primary}
  );
  font-weight: 600;
`;

export const HomeSubSectionTitle = styled.h3`
  margin-top: 0.8rem;
  font-size: 2.2rem;
  letter-spacing: 1px;

  font-weight: 700;
  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    from(${colors.primaryVariantLight}),
    to(${colors.primaryVariantDark})
  );
  background-image: linear-gradient(
    to right,
    ${colors.primaryVariantLight},
    ${colors.primaryVariantDark}
  );
  -webkit-background-clip: text;
  color: transparent;
  -webkit-background-clip: text;
  color: transparent;
`;
