const YEARS = [2019, 2020, 2021];
const MONTHS = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
];
const padZero = (num) => {
  return num < 10 ? 0 + num.toString() : num;
};

const YEAR_MONTH_VALUE = YEARS.map((year) => {
  let yearWithMonth = [];
  for (let i = 1; i < 13; i++) {
    i = padZero(i);
    yearWithMonth.push(`${year}-${i}`);
  }
  return yearWithMonth;
}).flat();

const YEAR_MONTH_DESCRIPTION = YEARS.map((year) => {
  return MONTHS.map((month) => `${month}/${year}`);
}).flat();

const periodOptions = [];

for (let i = 0; i < YEAR_MONTH_VALUE.length; i++) {
  periodOptions.push({
    value: YEAR_MONTH_VALUE[i],
    description: YEAR_MONTH_DESCRIPTION[i],
  });
}

const getCurrentDateObject = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = padZero(new Date().getMonth() + 1);
  const currentYearMonth = currentYear + '-' + currentMonth;
  return periodOptions.find(({ value }) => value === currentYearMonth);
};

export { periodOptions, getCurrentDateObject };
