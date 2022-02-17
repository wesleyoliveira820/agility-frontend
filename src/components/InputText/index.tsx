import { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import { Container } from './styles';
import { InputProps } from './input-text.types';

function InputText({
  name,
  bg = 'primary',
  spellCheck = false,
  ...rest
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    fieldName, defaultValue, registerField, error,
  } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => ref.current.value,
      setValue: (ref, value) => {
        ref.current.value = value;
      },
      clearValue: (ref) => {
        ref.current.value = '';
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container error={!!error} bg={bg}>
      <input
        className="input-text"
        ref={inputRef}
        defaultValue={defaultValue}
        spellCheck={spellCheck}
        name={name}
        {...rest}
      />
      {error && <strong className="error-text">{error}</strong>}
    </Container>
  );
}

export default InputText;
