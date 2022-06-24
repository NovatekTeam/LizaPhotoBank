import Search from "antd/lib/input/Search";
import React from "react";

export const SearchBox = () => {

    function onSearch() {
        console.log("search")
    }

    return (
        <Search
            style={{padding: '12px'}}
            placeholder="текст для поиска"
            allowClear
            enterButton="Найти"
            size="large"
            onSearch={onSearch}
        />
    )
};