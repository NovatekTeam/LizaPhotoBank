import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { GRAPHQL_SERVER} from './constants/environment'
import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import { YDiskFiles } from "./ydiskFiles/ydiskFiles";
import {TagsFilter} from "./tags/TagsFilter";
import {StatisticBox} from "./main/StatisticBox";
import {SearchBox} from "./search/SearchBox";
import {TagsCloud} from "./tags/TagsCloud";

console.log(GRAPHQL_SERVER)

const client = new ApolloClient({
    uri: GRAPHQL_SERVER,
    cache: new InMemoryCache()
});

const App = () => (
    <div style={{display: 'flex'}}>
        <TagsFilter />
        <div style={{width: "100%"}}>
            <StatisticBox/>
            <SearchBox/>
            <TagsCloud/>
            <YDiskFiles/>
        </div>
    </div>
);
ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
    , document.getElementById("app"));
