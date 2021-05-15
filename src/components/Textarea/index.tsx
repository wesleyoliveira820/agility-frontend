import { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import { Container } from './styles';

interface ITextareaProps {
  name: string;
  bg: 'primary' | 'secondary';
}

export type TextareaProps = JSX.IntrinsicElements['textarea'] & ITextareaProps;

function Textarea({
  name,
  bg = 'primary',
  spellCheck = false,
  ...rest
}: TextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    fieldName, defaultValue, registerField, error,
  } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textareaRef,
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
      <textarea
        ref={textareaRef}
        defaultValue={defaultValue}
        spellCheck={spellCheck}
        name={name}
        {...rest}
      />
      {error && <strong className="error-text">{error}</strong>}
    </Container>
  );
}

export default Textarea;
