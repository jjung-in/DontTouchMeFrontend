import { useEffect, useRef, useState } from 'react';
import * as S from './CustomSelect.styles';
import { formatNumber } from '@_utils/records';

interface Props {
  options: string[];
  value: string | number;
  onChange: (value: string | number) => void;
  isInput?: boolean;
  isPrice?: boolean;
  isShowArrow?: boolean;
}

const CustomSelect = ({ options, value, onChange, isInput, isPrice, isShowArrow }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const selected = options.find((options) => options === value);
    if (selected) {
      setInputValue(selected);
      setHoveredIndex(options.indexOf(selected));
      setSelectedIndex(options.indexOf(selected));
    }
  }, [value, options]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const index = options.findIndex((option) => option.toLowerCase().includes(val.toLowerCase()));
    setIsOpen(true);
    setHoveredIndex(val !== '' && index >= 0 ? index : null);
    setSelectedIndex(null);
    setInputValue(val);
    onChange(val);
  };

  const handleSelect = (index: number) => {
    const selectedValue = options[index];
    setInputValue(selectedValue);
    setSelectedIndex(index);
    setHoveredIndex(index);
    onChange(selectedValue);
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setHoveredIndex(selectedIndex === null ? null : selectedIndex);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown' && e.altKey) {
      setIsOpen(true);
      return;
    }

    if (!isOpen) {
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHoveredIndex((prev) => {
          const next = prev === null ? 0 : (prev + 1) % options.length;
          return next;
        });
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHoveredIndex((prev) => {
          const next = prev === null ? options.length - 1 : (prev - 1 + options.length) % options.length;
          return next;
        });
        break;
      case 'Enter':
        if (hoveredIndex !== null) {
          handleSelect(hoveredIndex);
        } else {
          setIsOpen(false);
        }
        break;
      case 'Escape':
        handleClose();
        break;
    }
  };

  return (
    <S.Container ref={ref}>
      <S.Input
        type={isPrice ? 'number' : 'text'}
        value={inputValue}
        min={0}
        readOnly={!isInput}
        onKeyDown={handleKeyDown}
        onClick={() => setIsOpen(true)}
        onFocus={() => setIsOpen(true)}
        onChange={handleChange}
        $isShowArrow={isShowArrow}
      ></S.Input>
      {isOpen && options.length > 0 && (
        <S.Dropdown>
          {options.map((option, index) => (
            <S.Option
              key={index}
              onClick={() => handleSelect(index)}
              $focused={index === hoveredIndex}
              $selected={index === selectedIndex}
            >
              {isPrice ? formatNumber(option) : option}
            </S.Option>
          ))}
        </S.Dropdown>
      )}
    </S.Container>
  );
};

export default CustomSelect;
