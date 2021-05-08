interface ILoginProps {
  email: string;
  password: string;
}

function loginValidator({ email, password }: ILoginProps) {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (email?.match(emailRegex) && password?.length >= 8) {
    return false;
  }
  return true;
}

export { loginValidator };
