const niceGroupDetailsString = (adults: number, children: number) => {
  const adultsString =
    adults > 1 ? `${adults} adults` : adults === 1 ? `${adults} adult` : "";
  const childrenString =
    children > 1
      ? `${children} children`
      : children === 1
      ? `${children} child`
      : "";

  const link = adultsString.length && childrenString.length ? " and " : "";

  return `${adultsString}${link}${childrenString}`;
};

export default niceGroupDetailsString;
