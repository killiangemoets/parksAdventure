const getEndDate = (startingDate: Date | string, duration: number) => {
  let endDate = new Date(startingDate);
  endDate.setDate(new Date(startingDate).getDate() + duration);
  return endDate;
};

export default getEndDate;
