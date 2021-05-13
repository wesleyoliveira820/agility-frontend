interface IUserProps {
  id: string;
  name: string;
  email: string;
  initial_name: string;
  color_name: string;
}

export function isLogged() {
  const token = localStorage.getItem('@agility:token');
  return !!token;
}

export function setToken(token: string) {
  return localStorage.setItem('@agility:token', token);
}

export function getToken() {
  const token = localStorage.getItem('@agility:token');

  if (!token) {
    return null;
  }

  return `Bearer ${token}`;
}

export function storeUser(userPayload: IUserProps) {
  const user = JSON.stringify(userPayload);

  localStorage.setItem('@agility:user', user);
}

export function getUser(): IUserProps | undefined {
  const user = localStorage.getItem('@agility:user');

  if (!user) return;

  return JSON.parse(user);
}
