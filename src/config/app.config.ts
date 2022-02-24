const oneDayInMinutes = 1440;

export default {
  api_url: process.env.REACT_APP_API_URL,
  api_websocket_url: process.env.REACT_APP_API_WEBSOCKET_URL,

  cookies: {
    token: {
      name: 'agility.token',
      expires: 10 / oneDayInMinutes, // 10 minutes in days
    },
    refresh_token: {
      name: 'agility.refresh-token',
      expires: 15 / oneDayInMinutes, // 15 minutes in days
    },

    path: '/',
    sameSite: 'lax',
  },
};
