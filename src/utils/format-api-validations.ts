interface ApiValidationProps {
  message: string;
  field: string;
}

type FormErrorsFormatted = {
  [x: string]: string
};

function formatApiValidations(formErrors: ApiValidationProps[]) {
  const errors: FormErrorsFormatted = {};

  formErrors.forEach(({ field, message }) => {
    errors[field] = message;
  });

  return errors;
}

export default formatApiValidations;
