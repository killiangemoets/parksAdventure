import styled from "styled-components";
import { ReactComponent as DotSVG } from "../../assets/icons/circle-dot.svg";
import colors from "../../colors";

export const PrivacyPolicyContainer = styled.div`
  min-height: calc(100vh - 8rem);
  padding: calc(8rem + 6.4rem) 4rem 6.4rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 6.4rem;
  align-items: center;

  h2 {
    text-align: center;
  }
`;

export const PrivacyPolicyContent = styled.div`
  max-width: 100rem;
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;
export const PrivacyPolicySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export const PrivacyPolicySectionTitle = styled.div`
  font-weight: 700;
  margin-right: 2.25rem;
  text-transform: uppercase;
  font-size: 2rem;
  letter-spacing: 0.6px;
`;
export const PrivacyPolicyText = styled.div`
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: 0.2px;
  word-spacing: 1px;
  font-weight: 500;
  text-align: justify;

  span {
    font-weight: 700;
  }
`;
export const PrivacyPolicyBulletPoint = styled.div`
  margin-left: 2rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

export const DotIconWrapper = styled.div`
  width: 1rem !important;
  height: 1rem !important;
`;

export const DotIcon = styled(DotSVG)`
  margin-top: 0.8rem;
  width: 0.8rem !important;
  height: 0.8rem !important;
  .path {
    fill: ${colors.darkGrey};
  }
`;
