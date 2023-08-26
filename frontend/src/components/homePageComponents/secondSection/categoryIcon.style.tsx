import styled from "styled-components";

import { ReactComponent as FamilyToursSVG } from "../../../assets/categoriesIcon/small_family.svg";
import { ReactComponent as ExpertToursSVG } from "../../../assets/categoriesIcon/expert_hiker.svg";
import { ReactComponent as MountainToursSVG } from "../../../assets/categoriesIcon/mountain_top.svg";
import { ReactComponent as DesertToursSVG } from "../../../assets/categoriesIcon/desert.svg";
import { ReactComponent as LongToursSVG } from "../../../assets/categoriesIcon/camping.svg";

import colors from "../../../colors";

export const FamilyTourIcon = styled(FamilyToursSVG)`
  width: 10rem;
  height: 10rem;
  .path {
    transition: all 0.3s;
    fill: ${colors.white};
  }
`;
export const ExpertTourIcon = styled(ExpertToursSVG)`
  width: 12rem;
  height: 12rem;
  .path {
    transition: all 0.3s;
    fill: ${colors.white};
  }
`;
export const MountainTourIcon = styled(MountainToursSVG)`
  width: 12rem;
  height: 12rem;
  .path {
    transition: all 0.3s;
    fill: ${colors.white};
  }
`;
export const DesertTourIcon = styled(DesertToursSVG)`
  width: 12rem;
  height: 12rem;
  .path {
    transition: all 0.3s;
    fill: ${colors.white};
  }
`;
export const LongTourIcon = styled(LongToursSVG)`
  width: 14rem;
  height: 14rem;
  .path {
    transition: all 0.3s;
    fill: ${colors.white};
  }
`;
