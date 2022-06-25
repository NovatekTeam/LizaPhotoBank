import React, {useEffect, useRef, useState} from "react";
import {Button, Input, Modal, Popover, Space, Table, Tag, Tooltip} from "antd";
import {CalendarTwoTone, EditTwoTone, PlusOutlined, SaveTwoTone} from "@ant-design/icons";
import { TweenOneGroup } from 'rc-tween-one';

export const FileTable = () => {

    const [selectedRow, setSelectedRow] = useState(undefined)
    const [inputTagVisible, setInputTagVisible] = useState(false);
    const [inputTagValue, setInputTagValue] = useState('');

    function popupImage(preview: string) {
        return (
            <img src={preview} alt={preview}/>
        )
    }

    const inputRef = useRef(null);
    useEffect(() => {
        if (inputTagVisible) {
            inputRef.current?.focus();
        }
    }, []);

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


    function removeTag(removedTag) {
        const newTags = selectedRow.tags.filter((tag) => tag !== removedTag);
        console.log(newTags);
        setSelectedRow({
            ...selectedRow,
            tags: newTags
        })
        console.log("remove tag " + removedTag);
    }

    function handleInputConfirm() {
        if (inputTagValue && selectedRow.tags.indexOf(inputTagValue) === -1) {
            selectedRow.tags = [...selectedRow.tags, inputTagValue]
        }

        setInputTagVisible(false);
        setInputTagValue('');
    }

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
            <Modal title={selectedRow?.file} visible={selectedRow} onOk={() => setSelectedRow(undefined)} onCancel={() => setSelectedRow(undefined)} >
                <Popover content={() => popupImage(selectedRow?.preview)} title={selectedRow?.file}>
                    <img style={{marginBottom: 16}}  width={150} height={150} src={selectedRow?.preview} alt={selectedRow?.preview}/>
                </Popover>
                <Input style={{marginBottom: 16}} prefix={
                    <Tooltip title="Дата изображения">
                        <CalendarTwoTone />
                    </Tooltip>
                } placeholder="Дата изображения" readOnly={true} defaultValue={selectedRow?.date}/>
                <div
                    style={{
                        marginBottom: 8,
                    }}
                >
                    <TweenOneGroup
                        enter={{
                            scale: 0.8,
                            opacity: 0,
                            type: 'from',
                            duration: 100,
                        }}
                        onEnd={(e) => {
                            if (e.type === 'appear' || e.type === 'enter') {
                                e.target.style = 'display: inline-block';
                            }
                        }}
                        leave={{
                            opacity: 0,
                            width: 0,
                            scale: 0,
                            duration: 200,
                        }}
                        appear={false}
                    >
                        {
                            selectedRow?.tags?.map(it =>
                                <Tag
                                    closable
                                    onClose={(e) => {
                                        e.preventDefault();
                                        removeTag(it);
                                    }}
                                >
                                    {it}
                                </Tag>
                            )
                        }
                    </TweenOneGroup>
                </div>
                {inputTagVisible && (
                    <Input
                        ref={inputRef}
                        type="text"
                        size="small"
                        style={{
                            width: 78,
                        }}
                        value={inputTagValue}
                        onChange={(e) =>  setInputTagValue(e.target.value)}
                        onBlur={handleInputConfirm}
                        onPressEnter={handleInputConfirm}
                    />
                )}
                {!inputTagVisible && (
                    <Tag onClick={() => setInputTagVisible(true)} style={{ background: '#fff',  borderStyle: 'dashed'}}>
                        <PlusOutlined /> Добавить
                    </Tag>
                )}
            </Modal>
        </div>
    )
}