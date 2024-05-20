import { ApolloClient, InMemoryCache } from "@apollo/client";
import { connectionProtocol, apiDomain, apiPort, apiEndPoint } from "@config";

const client = new ApolloClient({
  uri: `${connectionProtocol}://${apiDomain}:${apiPort}/${apiEndPoint}`,
  cache: new InMemoryCache(),
});
export default client;
