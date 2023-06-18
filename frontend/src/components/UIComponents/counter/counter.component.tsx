import { Formatter } from "antd/es/statistic/utils";
import {
  CounterContainer,
  CounterContent,
  CounterNumber,
  CounterTitle,
} from "./counter.style";
import CountUp from "react-countup";
import { FC } from "react";
import StatIcon, {
  STAT_ICON_TYPE_CLASSES,
} from "../statIcon/statIcon.component";
import { ConfigProvider } from "antd";

type CounterProps = {
  iconType: STAT_ICON_TYPE_CLASSES;
  title: string;
  value: number;
  decimals?: number;
};
const Counter: FC<CounterProps> = ({
  iconType,
  title,
  value,
  decimals = 0,
}) => {
  const formatter: Formatter = (value) => (
    <CountUp end={+value} separator="," decimals={decimals} />
  );
  return (
    <CounterContainer>
      <StatIcon iconType={iconType} />
      <CounterContent>
        <ConfigProvider
          theme={{
            hashed: false,
          }}>
          <CounterNumber value={value} formatter={formatter} />
        </ConfigProvider>
        <CounterTitle>{title}</CounterTitle>
      </CounterContent>
    </CounterContainer>
  );
};

export default Counter;
