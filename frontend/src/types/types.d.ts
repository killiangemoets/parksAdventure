type Info = {
  id: number | string;
  value: React.ReactNode;
};

type InfoString = {
  id: number | string;
  value: string;
};

type TInfo<T> = {
  id: number | string;
  value: T;
};
