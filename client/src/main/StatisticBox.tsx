import React from "react";
import {InfoBox} from "./InfoBox";
import {useyDiskPagination} from "../ydiskFiles/__generated__/testQuery";
import {PictureTwoTone, TagsTwoTone} from "@ant-design/icons";
import {words} from "../tags/TagsExample";

export const StatisticBox = () => {
    const { data, loading, error } = useyDiskPagination()

    return (
        <div style={{display: 'flex', width: "100%", alignItems: "center", justifyContent: "center", padding: '12px'}}>
           <InfoBox title={"Всего фото"} value={data?.ydiskPagination?.total} icon={<PictureTwoTone/>}/>
           <InfoBox title={"Всего тегов"} value={words.length} icon={<TagsTwoTone/>}/>
        </div>
    )
}