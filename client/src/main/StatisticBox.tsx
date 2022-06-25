import React from "react";
import {InfoBox} from "./InfoBox";
import {PictureTwoTone, TagsTwoTone} from "@ant-design/icons";
import {words} from "../tags/TagsExample";
import {TagsCloud} from "../tags/TagsCloud";
import {TagsChart} from "../tags/TagsChart";
import {usefilterTree} from "../tags/__generated__/filterTree";
import {usesearchBox} from "../search/__generated__/searchBox";

export const StatisticBox = () => {

    const filter = usefilterTree();
    const solr = usesearchBox({variables: {
            query: '*',
            page: 0
        }});

    return (
        <div style={{display: 'flex', width: "100%", alignItems: "center", justifyContent: "center", padding: '12px'}}>
            <InfoBox title={"Всего фото"} value={solr?.data?.SolrQuery?.response?.numFound} icon={<PictureTwoTone/>}/>
            <InfoBox title={"Всего тегов"} value={filter?.data?.TagsQuery?.length} icon={<TagsTwoTone/>}/>
            <TagsCloud/>
           <TagsChart/>
        </div>
    )
}