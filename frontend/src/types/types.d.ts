type Info = {
  id: number | string;
  value: string | React.ReactNode | number;
};

type InfoString = {
  id: number | string;
  value: string;
};

type TInfo<T> = {
  id: number | string;
  value: T;
};
