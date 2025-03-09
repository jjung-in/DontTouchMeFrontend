export const nonEmptyStringValidator = (value: string): string | null => {
  if (value.trim() === '') {
    return 'This field cannot be empty';
  }
  return null;
};

export const nonEmptyDateValidator = (value: string): string | null => {
  if (!value || value.trim() === '') {
    return 'Date is required';
  }
  return null;
};

export const nonNegativeIntegerValidator = (value: string | number): string | null => {
  if (value === '') return null;
  if (typeof value === 'number' && value >= 0) return null;
  if (typeof value === 'string' && /^\d+$/.test(value) && Number(value) >= 0) return null;

  return 'Please enter a valid number greater than or equal to 0';
};
