import React from "react";;
import {Input, Modal, Popover, Select, Tag, Tooltip} from "antd";
import {CalendarTwoTone, PlusOutlined} from "@ant-design/icons";
import {TweenOneGroup} from "rc-tween-one";
import {useEffect, useRef, useState} from "react";
import {usefilterTree} from "../tags/__generated__/filterTree";
import {useupdateDb} from "./__generated__/updateDb";
import {useupdateSolr} from "./__generated__/updateSolr";
import {TagsWhereUniqueInput} from "../__generated__/types";
const { Option } = Select;

export const FileEditor = (props: {selectedRow: {
        id: number,
        media_name: string,
        media_path: string,
        media_type: string,
        media_tags: [],
        media_preview_url: string
    }, onClose: (tags: string[]) => void}) => {

    let [updateDb] = useupdateDb();
    let [updateSolr] = useupdateSolr()

    let {data} = usefilterTree()


    const [selectedRow, setSelectedRow] = useState(undefined)
    const [selectedTags, setSelectedTags] = useState([])


    useEffect(() => {
        setSelectedRow(props.selectedRow);
        setSelectedTags(props.selectedRow?.media_tags);
    }, [props.selectedRow])


    function popupImage(preview: string) {
        return (
            <img style={{maxWidth: 640, maxHeight:480}} src={preview} alt={preview}/>
        )
    }


    const handleChange = (value: any[]) => {
        setSelectedTags(value)
    };

    function handleSave() {
        let tags = selectedTags.map(tagName => data?.TagsQuery?.find(it => it.tagName === tagName));
        updateDb({
            variables : {
                mediaId: +selectedRow?.id,
                tagsId: tags?.map(it => {
                    const tag: TagsWhereUniqueInput = {
                        id: +it.id
                    };
                    return tag;
                })
            }
        });
        updateSolr({
            variables: {
                mediaId: selectedRow?.id,
                tags: tags?.map(it => it.tagName)
            }
        })
        props.onClose(selectedTags);
    }

    return (
        <Modal title={selectedRow?.media_name} visible={selectedRow} onOk={handleSave} onCancel={() => {
            props.onClose(undefined);
        }} >
            <Popover content={() => popupImage(selectedRow?.media_preview_url)} title={selectedRow?.media_name}>
                <img style={{marginBottom: 16}}  width={150} height={150} src={selectedRow?.media_preview_url} alt={selectedRow?.media_preview_url}/>
            </Popover>
            <div
                style={{
                    marginBottom: 8,
                }}
            >
                <Select
                    mode="multiple"
                    allowClear
                    style={{
                        width: '100%',
                    }}
                    placeholder="Please select"
                    value={selectedTags}
                    onChange={handleChange}
                >
                    {
                        data?.TagsQuery?.map(it => <Option key={it.tagName}>{it.tagName}</Option>)
                    }
                </Select>
            </div>
        </Modal>
    )
}