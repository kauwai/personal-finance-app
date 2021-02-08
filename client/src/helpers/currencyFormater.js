const currency = 'BRL';
const region = 'pt-BR';

const applyCurrency = (value) => {
  return Intl.NumberFormat(region, {
    style: 'currency',
    currency,
  }).format(value);
};

export { applyCurrency };
