interface IApiValidationProps {
  message: string;
  field: string;
}

type FormErrorsFormatted = {
  [x: string]: string
};

function formatApiValidations(formErrors: IApiValidationProps[]) {
  const errors: FormErrorsFormatted = {};

  formErrors.forEach(({ field, message }) => {
    errors[field] = message;
  });

  return errors;
}

export default formatApiValidations;
