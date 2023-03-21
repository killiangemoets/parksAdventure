const niceDate = (dateToFormat: string | Date) => {
  const date = new Date(dateToFormat);

  const day = `0${date.getDate()}`.slice(-2);
  const month = `0${date.getMonth()}`.slice(-2);
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export default niceDate;
