import { createNetworkInterface } from 'apollo-client';

export default (ctx) => {
  const networkInterface = createNetworkInterface({
    uri: 'http://localhost:3000/graphql',
    ssrMode: true
  });
  // here you can place your middleware. ctx has the context forwarded from Nuxt
  return networkInterface;
};
