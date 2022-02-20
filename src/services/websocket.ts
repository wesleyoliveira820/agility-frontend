import Ws from '@adonisjs/websocket-client';

import appConfig from '../config/app.config';

const ws = Ws(appConfig.api_websocket_url);

export default ws;
