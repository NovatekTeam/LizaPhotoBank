import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { GRAPHQL_SERVER} from './constants/environment'
import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { YDiskFiles } from "./ydiskFiles/ydiskFiles";
import {TagsFilter} from "./tags/TagsFilter";
import {StatisticBox} from "./main/StatisticBox";
import {SearchBox} from "./search/SearchBox";
import {TagsCloud} from "./tags/TagsCloud";
import {TagsChart} from "./tags/TagsChart";
import {FileTable} from "./table/FileTable";

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
            <div style={{display: 'flex' , width: "100%", height: "400px", justifyContent: "center", alignItems:"center", alignSelf: "center"}}>
                <TagsCloud/>
                <TagsChart/>
            </div>
            <SearchBox/>
            <FileTable/>
            {/*<YDiskFiles/>*/}
        </div>
    </div>
);
ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
    , document.getElementById("app"));
