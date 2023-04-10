const compareDates = (date1: Date | string, date2: Date | string) => {
  return (
    new Date(date1).getDate() === new Date(date2).getDate() &&
    new Date(date1).getMonth() === new Date(date2).getMonth() &&
    new Date(date1).getFullYear() === new Date(date2).getFullYear()
  );
};

export default compareDates;
