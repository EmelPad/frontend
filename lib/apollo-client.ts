import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const client = new ApolloClient({
  link: new HttpLink({ uri:"https://api.studio.thegraph.com/query/1715879/emelpad/version/latest" }),
  cache: new InMemoryCache(),
});