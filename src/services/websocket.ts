import Ws from '@adonisjs/websocket-client';
import { getToken } from '../utils/auth-methods';

const urlConnection = process.env.NODE_ENV === 'development'
  ? 'ws://localhost:3333'
  : process.env.API_URL;

const ws = Ws(urlConnection);

const token = getToken();

ws.withJwtToken(token).connect();

export default ws;
