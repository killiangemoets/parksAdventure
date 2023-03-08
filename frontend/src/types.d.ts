type Info = {
  id: number | string;
  value: string | React.ReactNode | number;
};

type InfoString = {
  id: number | string;
  value: string;
};

type Stop = {
  latitude: number;
  longitude: number;
  text: string;
};

type Availability = {
  date: Dayjs;
  price: number;
  kidPrice: number | undefined;
  time: Dayjs;
  groupSize: number;
};
