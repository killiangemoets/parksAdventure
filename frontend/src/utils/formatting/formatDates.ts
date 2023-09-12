const niceDate = (dateToFormat: string | Date) => {
  const date = new Date(dateToFormat);

  date.setUTCHours(0, 0, 0, 0);
  const day = `0${date.getUTCDate()}`.slice(-2);
  const month = `0${date.getUTCMonth() + 1}`.slice(-2);
  const year = date.getUTCFullYear();

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
  return monthsList[new Date(date).getUTCMonth()];
};

export const niceFullDate = (dateToFormat: string | Date) => {
  const date = new Date(dateToFormat);

  date.setUTCHours(0, 0, 0, 0);
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  return `${niceMonth(dateToFormat)} ${day}, ${year}`;
};

export const niceDatesRange = (startingDate: Date, endDate: Date) => {
  return `From ${niceFullDate(startingDate)} to ${niceFullDate(endDate)}`;
};

export const niceTime = (time: string) => time.replace("-", ":");

export const getCreateAvailabilityDateFormat = (
  dateToFormat: Date | string
) => {
  const date = new Date(dateToFormat);
  date.setUTCHours(0, 0, 0, 0);
  const day = `0${date.getUTCDate()}`.slice(-2);
  const month = `0${date.getUTCMonth() + 1}`.slice(-2);
  const year = date.getUTCFullYear();

  return `${year}-${month}-${day}`;
};
