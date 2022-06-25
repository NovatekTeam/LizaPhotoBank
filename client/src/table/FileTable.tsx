import React, {useEffect, useRef, useState} from "react";
import {Button, Input, Modal, Popover, Space, Table, Tag, Tooltip} from "antd";
import {CalendarTwoTone, EditTwoTone, PlusOutlined, SaveTwoTone} from "@ant-design/icons";
import { TweenOneGroup } from 'rc-tween-one';
import {FileEditor} from "./FileEditor";

export const FileTable = () => {

    const [selectedRow, setSelectedRow] = useState(undefined)

    function popupImage(preview: string) {
        return (
            <img src={preview} alt={preview}/>
        )
    }

    const columns = [
        {
            title: 'Файл',
            dataIndex: 'file',
            key: 'file',
            render: (text) => <p>{text}</p>,
        },
        {
            title: 'Тэги',
            key: 'tags',
            dataIndex: 'tags',
            render: (tags) => (
                <span>
        {tags.map((tag) => {
            return (
                <Tag key={tag}>
                    {tag.toUpperCase()}
                </Tag>
            );
        })}
      </span>
            ),
        },
        {
            title: 'Изображение',
            key: 'img',
            render: (_, record) => (
                <Popover content={() => popupImage(record.preview)} title={record.file}>
                    <img width={50} height={50} src={record.preview} alt={record.preview}/>
                </Popover>
            ),
        },
        {
            title: 'Действие',
            key: 'action',
            render: (_, record) => (
                <Button icon={<EditTwoTone />} onClick={() => setSelectedRow(record)}/>
            ),
        },
    ];

    const data = [
        {
            file: 'file 1',
            date: '2022-06-25',
            tags: ['nice', 'developer'],
            preview: 'https://www.novatek.ru/common/upload/1-min[4].png'
        },
        {
            file: 'file 2',
            date: '2022-06-24',
            tags: ['loser'],
            preview: 'https://www.novatek.ru/common/upload/2-min-ru.png'
        },
        {
            file: 'file 3 ',
            date: '2022-06-23',
            tags: ['cool', 'teacher'],
            preview: 'https://www.novatek.ru/common/upload/CSKMS_ru.jpg'
        },
    ];

    return (
        <div  style={{width: "100%"}}>
            <Table
                style={{width: "100%"}}
                columns={columns}
                pagination={{
                    position: ['topLeft', 'bottomRight'],
                }}
                dataSource={data}
            />
            <FileEditor selectedRow={selectedRow}  />
        </div>
    )
}