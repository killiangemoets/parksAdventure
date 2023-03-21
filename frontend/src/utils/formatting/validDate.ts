function isValidDate(value: any) {
  return value instanceof Date && !isNaN(+value);
}

export default isValidDate;
