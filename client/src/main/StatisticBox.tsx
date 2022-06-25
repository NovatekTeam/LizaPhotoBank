import React from "react";
import {InfoBox} from "./InfoBox";
import {PictureTwoTone, TagsTwoTone} from "@ant-design/icons";
import {words} from "../tags/TagsExample";
import {TagsCloud} from "../tags/TagsCloud";
import {TagsChart} from "../tags/TagsChart";

export const StatisticBox = () => {

    return (
        <div style={{display: 'flex', width: "100%", alignItems: "center", justifyContent: "center", padding: '12px'}}>
            <InfoBox title={"Всего фото"} value={100} icon={<PictureTwoTone/>}/>
            <InfoBox title={"Всего тегов"} value={words.length} icon={<TagsTwoTone/>}/>
            <TagsCloud/>
           <TagsChart/>
        </div>
    )
}