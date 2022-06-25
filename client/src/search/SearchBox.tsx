import Search from "antd/lib/input/Search";
import React, {useEffect, useState} from "react";
import {FileTable} from "../table/FileTable";

export const SearchBox = (props: {tagFilter: string[]}) => {

    const [searchText, setSearchText] = useState('')
    const [tagFilter, setTagFilter] = useState([])

    function onSearch(value: string) {
        setSearchText(value);
    }

    useEffect(() => {
        setTagFilter(props.tagFilter);
    }, [props.tagFilter])

    return (
        <div style={{width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems:"center", alignSelf: "center"}}>
            <Search
                style={{padding: '12px', maxWidth: 1000}}
                placeholder="текст для поиска"
                allowClear
                enterButton="Найти"
                size="large"
                onSearch={onSearch}
            />
            <FileTable searchText={searchText} tagFilter={tagFilter} />
        </div>
    )
};