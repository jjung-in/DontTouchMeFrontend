import { ChangeEvent, useState } from 'react';

interface UseInputReturn<T> {
  value: T;
  error: string | null;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  reset: () => void;
}

const useInput = <T>(initialValue: T, validator: (value: T) => string | null = () => null): UseInputReturn<T> => {
  const [value, setValue] = useState<T>(initialValue);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value as T;
    setValue(newValue);

    if (typeof validator === 'function') {
      const validationError = validator(newValue);
      setError(validationError);
    }
  };

  const reset = () => {
    setValue(initialValue);
    setError(null);
  };

  return { value, error, onChange: handleChange, reset };
};

export default useInput;
