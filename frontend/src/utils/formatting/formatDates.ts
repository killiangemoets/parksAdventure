const niceDate = (dateToFormat: string | Date) => {
  const date = new Date(dateToFormat);

  const day = `0${date.getDate()}`.slice(-2);
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export default niceDate;

export const niceMonth = (date: string | Date) => {
  const monthsList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthsList[new Date(date).getMonth()];
};

export const niceFullDate = (dateToFormat: string | Date) => {
  const date = new Date(dateToFormat);
  const day = date.getDate();
  const year = date.getFullYear();

  return `${niceMonth(dateToFormat)} ${day}, ${year}`;
};

export const niceDatesRange = (startingDate: Date, endDate: Date) => {
  return `From ${niceFullDate(startingDate)} to ${niceFullDate(endDate)}`;
};
