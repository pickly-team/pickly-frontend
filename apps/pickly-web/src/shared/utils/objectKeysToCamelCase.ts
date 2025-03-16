const objectKeysToCamelCase = (object: object) => {
  return Object.entries(object).reduce(
    (result, [key, value]) => ({
      ...result,
      [snakeToCamel(key)]: value,
    }),
    {},
  );
};

export default objectKeysToCamelCase;

function capitalize(str: string) {
  if (str.length === 0) return '';

  return str[0].toUpperCase() + str.slice(1);
}
function snakeToCamel(str: string) {
  const [start, ...rest] = str.split('_');

  return start + rest.map(capitalize).join('');
}
