import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {GRAPHQL_SERVER} from './constants/environment'
import React, {useState} from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import {TagsFilter} from "./tags/TagsFilter";
import {StatisticBox} from "./main/StatisticBox";
import {SearchBox} from "./search/SearchBox";

console.log(GRAPHQL_SERVER)

const client = new ApolloClient({
    uri: GRAPHQL_SERVER,
    cache: new InMemoryCache()
});


const App = () => {
    const [tagFilter, setTagFilter] = useState([])

    return (
        <div style={{display: 'flex'}}>
            <TagsFilter select={selectedKeys => setTagFilter(selectedKeys) } />
            <div style={{width: "100%"}}>
                <StatisticBox/>
                <SearchBox tagFilter={tagFilter}/>
            </div>
        </div>
    );
}
ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
    , document.getElementById("app"));
