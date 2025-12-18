import React, { useEffect, useRef } from 'react';
import './AppInput.scss';

/* утилиты */
const onlyDigits = (s) => String(s || '').replace(/\D/g, '');

function formatRuPhone(raw) {
  let d = onlyDigits(raw);

  if (d.startsWith('8')) d = '7' + d.slice(1);
  else if (d.startsWith('9')) d = '7' + d;
  else if (d.length > 0 && d[0] !== '7') d = '7' + d.slice(1);

  d = d.slice(0, 11);

  const n = d.slice(1);
  let out = '+7';
  if (n.length > 0) out += '(' + n.slice(0, 3);
  if (n.length >= 3) out += ')';
  if (n.length > 3) out += n.slice(3, 6);
  if (n.length > 6) out += '-' + n.slice(6, 8);
  if (n.length > 8) out += '-' + n.slice(8, 10);

  return out.slice(0, 16);
}

const AppInput = ({
  value = '',
  onChange,
  placeholder,
  fieldType,
  maxLength,
  className = '',
}) => {
  const textareaRef = useRef(null);

  let displayedValue = String(value);

  if (fieldType === 'phone') {
    displayedValue = formatRuPhone(displayedValue);
  } else if (fieldType === 'inn') {
    displayedValue = onlyDigits(displayedValue).slice(0, 12);
  } else if (fieldType === 'email') {
    displayedValue = displayedValue.replace(/\s+/g, '');
  }

  const handleChange = (e) => {
    let next = e.target.value;

    if (fieldType === 'phone') {
      next = formatRuPhone(next);
    } else if (fieldType === 'inn') {
      next = onlyDigits(next).slice(0, 12);
    } else if (fieldType === 'email') {
      next = next.replace(/\s+/g, '');
    } else if (fieldType === 'textarea' && maxLength) {
      next = next.slice(0, maxLength);
    }

    onChange?.(next);
  };

  /* автоподстройка высоты textarea */
  useEffect(() => {
    if (fieldType === 'textarea' && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + 'px';
    }
  }, [displayedValue, fieldType]);

  return (
    <div className="app-input">
      {fieldType === 'textarea' ? (
        <textarea
          ref={textareaRef}
          className={`input textarea ${className}`}
          placeholder={placeholder}
          value={displayedValue}
          onChange={handleChange}
          rows={3}
          maxLength={maxLength}
        />
      ) : (
        <input
          className={`input ${className}`}
          placeholder={placeholder}
          value={displayedValue}
          onChange={handleChange}
          {...(fieldType === 'phone'
            ? { inputMode: 'tel', maxLength: 16 }
            : {})}
          {...(fieldType === 'inn'
            ? { inputMode: 'numeric', maxLength: 12 }
            : {})}
        />
      )}
    </div>
  );
};

export default AppInput;
