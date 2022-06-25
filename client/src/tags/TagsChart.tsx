import React from "react";
import {
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import {usefilterTree} from "./__generated__/filterTree";
export const TagsChart = () => {

    const filter = usefilterTree();

    let tagsQuery = filter?.data?.TagsQuery;
    let mediasMap = tagsQuery?.map(it => it?._count.medias);
    let distinctTagGroup = mediasMap?.filter((it , pos) => mediasMap.indexOf(it) == pos);
    console.log("distinctTagGroup " + distinctTagGroup)
    if (distinctTagGroup && distinctTagGroup.length > 2) {
        tagsQuery = tagsQuery?.sort((a, b) =>{
            let mediaB = b?._count?.medias;
            let mediaA = a?._count?.medias;
            if (mediaA && mediaB && a !== b) return mediaB - mediaA;
            return 0
        })
    }
    let topTags = tagsQuery?.slice(0, 10).map(it => ({
        название: it?.tagName,
        количество: it?._count?.medias
    }));

    return (
        <div style={{height: 300, width: 300}}>
            <ResponsiveContainer>
                <ComposedChart
                    layout="vertical"
                    data={topTags}
                    margin={{
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                    }}
                >
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis type="number" />
                    <YAxis dataKey="название" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="количество" barSize={20} fill="orange" />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    )

};