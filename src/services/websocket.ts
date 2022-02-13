import Ws from '@adonisjs/websocket-client';
import { getToken } from '../utils/auth-methods';

const urlConnection = process.env.REACT_APP_API_WEBSOCKET_URL;

const ws = Ws(urlConnection);

const token = getToken();

ws.withJwtToken(token).connect();

export default ws;
