import React from "react";
import {Card, Statistic} from "antd";
import {PictureTwoTone} from "@ant-design/icons";

export const InfoBox = (props: {title: string, value: number, icon: React.ReactNode}) => {
    return (<div>
        <Card>
            <Statistic
                title={props.title}
                value={props.value}
                precision={0}
                valueStyle={{
                    color: '#3f8600',
                }}
                prefix={props.icon}
            />
        </Card>
    </div>);
}