import { FC, useMemo, useState } from "react";
import {
  ChartTitle,
  LargeChartContainer,
  MediumChartContainer,
  MediumSmallChartContainer,
  Popup,
  PopupContent,
  PopupTitle,
  SmallChartContainer,
} from "./charts.style";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import { ArcElement, ChartData } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { formatPrice } from "../../../utils/formatting/formatPrice";
import colors from "../../../colors";

ChartJS.register(ArcElement);

type DoughnutChartProps = {
  title: string;
  data: ChartData<"doughnut", number[], string>;
};

export const DoughnutChart: FC<DoughnutChartProps> = ({ title, data }) => {
  return (
    <SmallChartContainer>
      <ChartTitle>{title}</ChartTitle>
      <Doughnut data={data} />
    </SmallChartContainer>
  );
};

type BarChartProps = {
  title: string;
  data: ChartData<"bar", number[], string>;
  options?: any;
};

export const BarChart: FC<BarChartProps> = ({ title, data, options }) => {
  return (
    <MediumChartContainer>
      <ChartTitle>{title}</ChartTitle>
      <Bar options={options} data={data} />
    </MediumChartContainer>
  );
};

export const SmallBarChart: FC<BarChartProps> = ({ title, data, options }) => {
  return (
    <MediumSmallChartContainer>
      <ChartTitle>{title}</ChartTitle>
      <Bar options={options} data={data} />
    </MediumSmallChartContainer>
  );
};

type PieChartProps = {
  title: string;
  data: ChartData<"pie", number[], string>;
};

export const PieChart: FC<PieChartProps> = ({ title, data }) => {
  return (
    <SmallChartContainer>
      <ChartTitle>{title}</ChartTitle>
      <Pie data={data} />
    </SmallChartContainer>
  );
};

type LineChartProps = {
  title: string;
  data: ChartData<"line", number[], string>;
};

export const LineChart: FC<LineChartProps> = ({ title, data }) => {
  return (
    <LargeChartContainer>
      <ChartTitle>{title}</ChartTitle>
      <Line data={data} />
    </LargeChartContainer>
  );
};

export const SmallLineChart: FC<LineChartProps> = ({ title, data }) => {
  return (
    <MediumSmallChartContainer>
      <ChartTitle>{title}</ChartTitle>
      <Line data={data} />
    </MediumSmallChartContainer>
  );
};

type MapChartProps = {
  title: string;
  data: {
    tour: string;
    lng: number;
    lat: number;
    revenue: number;
  }[];
};

export const MapChart: FC<MapChartProps> = ({ title, data }) => {
  const [popupInfo, setPopupInfo] = useState<{
    tour: string;
    revenue: number;
  } | null>(null);
  const geoUrl =
    "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

  const valueMax = data.reduce(
    (max, item) => (item.revenue > max ? item.revenue : max),
    0
  );
  const popScale = useMemo(
    () => scaleLinear().domain([0, valueMax]).range([0, 24]),
    [valueMax]
  );

  return (
    <LargeChartContainer>
      <ChartTitle>{title}</ChartTitle>
      <ComposableMap projectionConfig={{ rotate: [-10, 0, 0] }}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={colors.veryLightGrey}
              />
            ))
          }
        </Geographies>
        {data.map(({ tour, lng, lat, revenue }) => {
          return (
            <Marker key={tour} coordinates={[lng, lat]}>
              <circle
                fill={colors.primary}
                stroke={colors.primaryMediumLight}
                r={popScale(revenue)}
                onMouseOver={() => {
                  setPopupInfo({ tour, revenue });
                }}
                onMouseLeave={() => {
                  setPopupInfo(null);
                }}
                style={{ cursor: "pointer" }}
              />
            </Marker>
          );
        })}
      </ComposableMap>
      {popupInfo && (
        <Popup>
          <PopupTitle>{popupInfo.tour}</PopupTitle>
          <PopupContent>{formatPrice(popupInfo.revenue)}</PopupContent>
        </Popup>
      )}
    </LargeChartContainer>
  );
};
