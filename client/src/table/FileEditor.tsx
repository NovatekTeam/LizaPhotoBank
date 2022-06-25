import React from "react";;
import {Input, Modal, Popover, Select, Tag, Tooltip} from "antd";
import {CalendarTwoTone, PlusOutlined} from "@ant-design/icons";
import {TweenOneGroup} from "rc-tween-one";
import {useEffect, useRef, useState} from "react";
import {usefilterTree} from "../tags/__generated__/filterTree";
import {useupdateDb} from "./__generated__/updateDb";
import {useupdateSolr} from "./__generated__/updateSolr";
import {TagsWhereUniqueInput} from "../__generated__/types";

export const FileEditor = (props: {selectedRow: {
        id: number,
        media_name: string,
        media_path: string,
        media_type: string,
        media_tags: [],
        media_preview_url: string
    }}) => {

    let [updateDb] = useupdateDb();
    let [updateSolr] = useupdateSolr()

    let {data} = usefilterTree()


    const [selectedRow, setSelectedRow] = useState(undefined)
    const [selectedTags, setSelectedTags] = useState([])


    useEffect(() => {
        setSelectedRow(props.selectedRow);
    }, [props.selectedRow])


    function popupImage(preview: string) {
        return (
            <img src={preview} alt={preview}/>
        )
    }

    function findTags() {
        return data?.TagsQuery.filter(it => selectedRow?.media_tags?.include(it.tagName));
    }

    const handleChange = (value: any[]) => {
        let tags = value.map(idx => data?.TagsQuery[idx]);
        setSelectedTags(tags)
    };

    function handleSave() {

       updateDb({
           variables : {
               mediaId: +selectedRow?.id,
               tagsId: selectedTags?.map(it => {
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
                tags: selectedTags?.map(it => it.tagName)
            }
        })
        setSelectedRow(undefined)
        setSelectedTags([])
    }

    return (
        <Modal title={selectedRow?.media_name} visible={selectedRow} onOk={handleSave} onCancel={() => {
            setSelectedRow(undefined)
            setSelectedTags([])
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
                    defaultValue={findTags()}
                    onChange={handleChange}
                >
                    {
                        data?.TagsQuery?.map(it => <Select key={it.id}>{it.tagName}</Select>)
                    }
                </Select>
            </div>
        </Modal>
    )
}