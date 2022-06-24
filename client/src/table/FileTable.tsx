import React from "react";
import {Space, Table, Tag} from "antd";

export const FileTable = () => {

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
            title: 'Действие',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Изменить</a>
                    <a>Переопределить</a>
                </Space>
            ),
        },
    ];

    const data = [
        {
            file: 'file 1',
            tags: ['nice', 'developer'],
        },
        {
            file: 'file 2',
            tags: ['loser'],
        },
        {
            file: 'file 3 ',
            tags: ['cool', 'teacher'],
        },
    ];



    return (
        <Table
            style={{width: "100%"}}
            columns={columns}
            pagination={{
                position: ['topLeft', 'bottomRight'],
            }}
            dataSource={data}
        />
    )
}