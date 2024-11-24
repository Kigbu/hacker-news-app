import React from 'react';
import {jwtDecode} from 'jwt-decode';
import {create} from 'apisauce';
import {L} from 'utils/helpers';

const apiUrl = `https://hacker-news.firebaseio.com/v0`;
// const apiUrl = getEnvVariable('apiUrl');

L('apiUrl ::::::::', apiUrl);

// const apiKey = REACT_APP_API_KEY;

function useApiClient(accessToken: any) {
  const client = create({
    baseURL: apiUrl,
  });

  client.addAsyncRequestTransform(async (request: any) => {
    // add api key
    // request.headers['X-API-Key'] = apiKey;

    if (!accessToken) return;
    const decoded: any = jwtDecode(accessToken);
    if (Date.now() >= +decoded.exp * 1000) {
      // toast.error("your session has expired!", { onClose: () => signOut() });
      L('session expired');
    }
    request.headers['Authorization'] = `Bearer ${accessToken}`;
  });

  client.addAsyncResponseTransform(async (response: any) => {
    if (
      response.problem === 'NETWORK_ERROR' ||
      response.problem === 'CONNECTION_ERROR' ||
      response.problem === 'TIMEOUT_ERROR'
    ) {
      // Toast.show(
      //   "Poor or no internet connection. please check your internet connection",
      //   {
      //     duration: Toast.durations.LONG,
      //     position: Toast.positions.BOTTOM,
      //     shadow: true,
      //     animation: true,
      //     hideOnPress: true,
      //     delay: 0,
      //     backgroundColor: "black",
      //   }
      // );
    }
  });

  return {client};
}

export default useApiClient;
