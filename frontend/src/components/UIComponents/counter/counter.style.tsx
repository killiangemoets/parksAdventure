import styled from "styled-components";
import { Statistic } from "antd";

export const CounterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  border-radius: 12px;
  /* width: 16rem; */
  height: 14rem;
  width: 100%;
  background-color: #fefdfa;
  -webkit-box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.1);
  box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.1);
`;

export const CounterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0rem;
`;

export const CounterNumber = styled(Statistic)`
  /* .ant-statistic { */
  .ant-statistic-content .ant-statistic-content-value {
    font-weight: 600;
    text-transform: uppercase;
    font-size: 3.2rem;
    letter-spacing: 1px;
  }
`;

export const CounterTitle = styled.p`
  font-size: 1.6rem;
  font-weight: 400;
  text-transform: capitalize;
  letter-spacing: 1px;
  color: #aaa;
`;
