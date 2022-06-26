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
    let topTags = tagsQuery?.map(it => ({
        название: it?.tagName,
        количество_фото: it?._count?.medias
    })).sort((a, b) => {
        return b?.количество_фото - a?.количество_фото
    }).filter(it => it?.количество_фото > 0).slice(0, 10);

    return (
        <div style={{height: 300, width: 300}}>
            <ResponsiveContainer>
                <ComposedChart
                    layout="vertical"
                    data={topTags}
                >
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis type="number" />
                    <YAxis dataKey="название" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="количество_фото" barSize={20} fill="orange" />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    )

};