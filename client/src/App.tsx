import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { GRAPHQL_SERVER} from './constants/environment'
import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import { YDiskFiles } from "./ydiskFiles/ydiskFiles";

console.log(GRAPHQL_SERVER)

const client = new ApolloClient({
  uri: GRAPHQL_SERVER,
  cache: new InMemoryCache()
});

const App = () => (
  <YDiskFiles />
);
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  , document.getElementById("app"));
