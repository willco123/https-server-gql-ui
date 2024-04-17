import { ApolloClient, InMemoryCache } from "@apollo/client";

const connectionProtocol = process.env.CONN_PROTOCOL;
console.log("connectionProtocol :>> ", connectionProtocol);

const client = new ApolloClient({
  uri: "http://localhost:3090/graphql", // your GraphQL server endpoint
  cache: new InMemoryCache(),
});

export default client;
