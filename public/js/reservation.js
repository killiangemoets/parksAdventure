export const renderNumPeopleInput = (date, bookings, maxGroupSize) => {
  const bookingsForSelectedDate = bookings.find((booking) => {
    const bookingDate = new Date(booking._id);
    const selectedDate = new Date(date);
    return (
      bookingDate.getFullYear() === selectedDate.getFullYear() &&
      bookingDate.getMonth() === selectedDate.getMonth() &&
      bookingDate.getDate() === selectedDate.getDate()
    );
  });
  const maxAvailable = bookingsForSelectedDate
    ? maxGroupSize - bookingsForSelectedDate.currentGroup
    : maxGroupSize;

  console.log({
    date,
    bookings,
    maxGroupSize,
    maxAvailable,
    bookingsForSelectedDate,
  });
  document.querySelector('#number-of-hikers').innerHTML = '';
  let markup = '';
  for (let i = 1; i <= maxGroupSize; i++) {
    if (i <= maxAvailable) markup += `<option value="${i}">${i}</option>`;
    else
      markup += `<option value="${i}" disabled class="disabled-option">${i}</option>`;
  }
  document
    .querySelector('#number-of-hikers')
    .insertAdjacentHTML('afterbegin', markup);
};
