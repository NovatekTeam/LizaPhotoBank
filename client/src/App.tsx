import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import { YDiskFiles } from "./ydiskFiles/ydiskFiles";

const client = new ApolloClient({
  uri: 'http://localhost:3333/graphql',
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
