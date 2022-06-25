import Search from "antd/lib/input/Search";
import React from "react";

export const SearchBox = () => {

    function onSearch() {
        console.log("search")
    }

    return (
        <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems:"center", alignSelf: "center"}}>
            <Search
                style={{padding: '12px', maxWidth: 1000}}
                placeholder="текст для поиска"
                allowClear
                enterButton="Найти"
                size="large"
                onSearch={onSearch}
            />
        </div>
    )
};