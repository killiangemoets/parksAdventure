niceMonth = (date) => {
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
  
niceFullDate = (dateToFormat) => {
    const date = new Date(dateToFormat);
    const day = date.getDate();
    const year = date.getFullYear();
  
    return `${niceMonth(dateToFormat)} ${day}, ${year}`;
  };
  
exports.niceDatesRange = (startingDate, duration) => {
    let endDate = new Date(startingDate);
    endDate.setDate(new Date(startingDate).getDate() + duration);
    return `From ${niceFullDate(startingDate)} to ${niceFullDate(endDate)}`;
  };
  

exports.niceGroupDetailsString = (adults, children) => {
    const adultsString =
      adults > 1 ? `${adults} Adults` : adults === 1 ? `${adults} Adult` : "";
    const childrenString =
      children > 1
        ? `${children} Children`
        : children === 1
        ? `${children} Child`
        : "";
  
    const link = adultsString.length && childrenString.length ? " and " : "";
  
    return `${adultsString}${link}${childrenString}`;
  };
  

  exports.compareDates = (date1, date2) => {
    return (
      new Date(date1).getDate() === new Date(date2).getDate() &&
      new Date(date1).getMonth() === new Date(date2).getMonth() &&
      new Date(date1).getFullYear() === new Date(date2).getFullYear()
    );
  };