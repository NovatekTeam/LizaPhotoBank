import React from "react";
import {words} from "./TagsExample";
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
export const TagsChart = () => {

    let topTags = words.sort((a, b) => b.value - a.value).slice(0, 10).map(it => ({
      название: it.text,
      количество: it.value
    }));

    return (

            <ComposedChart
                layout="vertical"
                width={500}
                height={400}
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
    )

};