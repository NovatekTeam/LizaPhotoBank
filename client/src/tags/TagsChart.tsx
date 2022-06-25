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