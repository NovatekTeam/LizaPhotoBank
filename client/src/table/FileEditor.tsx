import React from "react";;
import {Input, Modal, Popover, Tag, Tooltip} from "antd";
import {CalendarTwoTone, PlusOutlined} from "@ant-design/icons";
import {TweenOneGroup} from "rc-tween-one";
import {useEffect, useRef, useState} from "react";

export const FileEditor = (props: {selectedRow: {
        media_name: string,
        media_path: string,
        media_type: string,
        media_tags: [],
        media_preview_url: string
    }}) => {


    const [selectedRow, setSelectedRow] = useState(undefined)

    useEffect(() => {
        setSelectedRow(props.selectedRow);
    }, [props.selectedRow])

    const [inputTagVisible, setInputTagVisible] = useState(false);
    const [inputTagValue, setInputTagValue] = useState('');

    const inputRef = useRef(null);
    useEffect(() => {
        if (inputTagVisible) {
            inputRef.current?.focus();
            inputRef.current?.focus();
        }
    }, []);


    function popupImage(preview: string) {
        return (
            <img src={preview} alt={preview}/>
        )
    }

    function handleInputConfirm() {
        if (inputTagValue && selectedRow.media_tags.indexOf(inputTagValue) === -1) {
            selectedRow.media_tags = [...selectedRow.media_tags, inputTagValue]
        }

        setInputTagVisible(false);
        setInputTagValue('');
    }


    function removeTag(removedTag) {
        const newTags = selectedRow.media_tags.filter((tag) => tag !== removedTag);
        console.log(newTags);
        setSelectedRow({
            ...selectedRow,
            media_tags: newTags
        })
        console.log("remove tag " + removedTag);
    }


    return (
        <Modal title={selectedRow?.media_name} visible={selectedRow} onOk={() => setSelectedRow(undefined)} onCancel={() => setSelectedRow(undefined)} >
            <Popover content={() => popupImage(selectedRow?.media_preview_url)} title={selectedRow?.media_name}>
                <img style={{marginBottom: 16}}  width={150} height={150} src={selectedRow?.media_preview_url} alt={selectedRow?.media_preview_url}/>
            </Popover>
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
                        selectedRow?.media_tags?.map(it =>
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
    )
}