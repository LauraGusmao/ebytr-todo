module.exports = () => {
  const date = new Date();
  return date.toISOString().slice(0, 10);
};
//  Ref: https://stackoverflow.com/questions/2013255/how-to-get-year-month-day-from-a-date-object
