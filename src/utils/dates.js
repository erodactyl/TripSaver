export const sortTripsByDate = trips => {
  return trips.sort((a, b) => (a.date < b.date ? -1 : 1));
};

export const getDateString = () => {
  const date = new Date();
  return `${date.getFullYear()}-${getMonth(date)}-${getDay(date)}`;
};

const getDay = date => {
  const day = date.getDate().toString();
  return day.length === 1 ? `0${day}` : day;
};

const getMonth = date => {
  const month = (date.getMonth() + 1).toString();
  return month.length === 1 ? `0${month}` : month;
};
