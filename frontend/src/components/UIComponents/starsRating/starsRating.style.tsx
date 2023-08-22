import { Rate } from "antd";
import styled from "styled-components";
import colors from "../../../colors";

export const StarsRatingContainer = styled.div`
  display: flex;
  gap: 1rem;

  .ant-rate {
    color: ${colors.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
  }

  .ant-rate-disabled.ant-rate .ant-rate-star {
    margin: 0;
  }

  .ant-rate .ant-rate-star-first .anticon,
  .ant-rate .ant-rate-star-second .anticon {
    font-size: 2.2rem;
  }
`;

export const RatingData = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 0.4rem;
  margin-bottom: 0.28rem;
`;

export const RatingValue = styled.p`
  font-size: 1.4rem;
  line-height: 1.4rem;
  font-weight: 700;
`;
export const NumRatings = styled.p`
  font-size: 1.2rem;
  line-height: 1.4rem;
  font-weight: 400;
`;

export const LinkNumRatings = styled(NumRatings)`
  color: ${colors.primary};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export const StarsRate = styled(Rate)``;
