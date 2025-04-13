import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as S from './TagSelect.styles';
import Tag from '@_components/Common/Tag/Tag';

interface Props {
  options: string[];
  value: string[];
  onChange?: (value: string[]) => void;
  isReadOnly?: boolean;
}

const TagSelect = ({ options, value, onChange, isReadOnly }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const filteredOptions = useMemo(() => options.filter((option) => !value.includes(option)), [options, value]);

  const handleClose = () => {
    setIsOpen(false);
    setHoveredIndex(null);
  };

  const handleSelect = useCallback(
    (option: string) => {
      onChange?.([...value, option]);
      setHoveredIndex(null);
    },
    [onChange, value],
  );

  const handleRemove = useCallback(
    (target: string) => {
      onChange?.(value.filter((v) => v !== target));
    },
    [onChange, value],
  );

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
    const handleKey = (e: KeyboardEvent) => {
      const activeElement = document.activeElement;
      const isFocused = ref.current?.contains(activeElement);

      if (!isFocused) return;

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
            const next = prev === null ? 0 : prev + 1 === filteredOptions.length ? prev : prev + 1;
            return next;
          });
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHoveredIndex((prev) => {
            const next = prev === null || prev === 0 ? prev : prev - 1;
            return next;
          });
          break;
        case 'Enter':
          if (hoveredIndex !== null && filteredOptions[hoveredIndex]) {
            handleSelect(filteredOptions[hoveredIndex]);
            setHoveredIndex(null);
          } else {
            setIsOpen(false);
          }
          break;
        case 'Backspace':
          if (value.length > 0) {
            handleRemove(value[value.length - 1]);
          }
          break;
        case 'Tab':
        case 'Escape':
          handleClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, hoveredIndex, filteredOptions, value, handleSelect, handleRemove]);

  return (
    <S.Container ref={ref}>
      <S.SelectBox
        tabIndex={0}
        onClick={() => setIsOpen(true)}
        onFocus={() => setIsOpen(true)}
        $focused={isOpen && !isReadOnly}
      >
        {value.map((tag) => (
          <Tag key={tag} label={tag} isButton={!isReadOnly} handleDelete={() => handleRemove(tag)} />
        ))}
      </S.SelectBox>
      {isOpen && !isReadOnly && filteredOptions.length > 0 && (
        <S.Dropdown>
          {filteredOptions.map((option, index) => (
            <S.Option key={option} onClick={() => handleSelect(option)} $focused={index === hoveredIndex}>
              {option}
            </S.Option>
          ))}
        </S.Dropdown>
      )}
    </S.Container>
  );
};

export default TagSelect;
