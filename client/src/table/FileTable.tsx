import React, {useEffect, useState} from "react";
import {Button, Popover, Table, Tag} from "antd";
import { EditTwoTone} from "@ant-design/icons";
import {FileEditor} from "./FileEditor";
import {usesearchBox} from "../search/__generated__/searchBox";

export const FileTable = (props: {searchText: string, tagFilter: string[]}) => {

    function getQuery() {
        let tags = props.tagFilter.join(' ');
        return props.searchText && props.searchText.length > 0 ? props.searchText + " " + tags : tags.length > 0 ? tags : '*';
    }

    const { data, loading, error, refetch } = usesearchBox({variables: {
            query: getQuery(),
            page: 0
        }});

    const [dataResponse, setDataResponse] = useState(data?.SolrQuery?.response)
    const [searchText, setSearchText] = useState('')

    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0
    });

    useEffect(() => {
        refetch({query : getQuery(), page: 0}).then(value => {
            setDataResponse(value.data.SolrQuery.response);
            setPagination({
                ...pagination,
                current: 1,
                total: value.data.SolrQuery.response.numFound
            });
        })
        setSearchText(props.searchText);
    }, [props.searchText, props.tagFilter])

    const [selectedRow, setSelectedRow] = useState(undefined)

    function popupImage(preview: string) {
        return (
            <img style={{maxHeight: 480, maxWidth: 640}} src={preview} alt={preview}/>
        )
    }

    const columns = [
        {
            title: 'Файл',
            key: 'media_name',
            dataIndex: 'media_name',
            render: (text) => <p>{text}</p>,
        },
        {
            title: 'Тэги',
            key: 'media_tags',
            dataIndex: 'media_tags',
            render: (media_tags) => (
                <span>
        {media_tags?.map((tag) => {
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
            key: 'media_path',
            render: (_, record) => (
                <Popover content={() => popupImage(record.media_preview_url)} title={record.title}>
                    <img width={50} height={50} src={record.media_preview_url} alt={record.media_preview_url}/>
                </Popover>
            ),
        },
        {
            title: 'Редактировать',
            key: 'action',
            render: (_, record) => (
                <Button icon={<EditTwoTone />} onClick={() => {
                    setSelectedRow(record);
                }}/>
            ),
        },
    ];

    const handleTableChange = (newPagination, filters, sorter) => {
        console.log("newPagination.current"  + newPagination.current + " newPagination.pageSize " + newPagination.pageSize)
        refetch({query : searchText && searchText.length > 0 ? searchText : '*', page: (newPagination.current - 1) * newPagination.pageSize}).then(value => {
            setDataResponse(value.data.SolrQuery.response);
            setPagination({
                ...newPagination,
                total: value.data.SolrQuery.response.numFound
            });
        })
    };

    return (
        <div  style={{width: "100%"}}>
            <Table
                style={{width: "100%"}}
                columns={columns}
                pagination={pagination}
                dataSource={dataResponse?.docs}
                onChange={handleTableChange}
            />
            <FileEditor selectedRow={selectedRow} onClose={(selectedTags) => {
               setSelectedRow(null);
            }}   />
        </div>
    )
}