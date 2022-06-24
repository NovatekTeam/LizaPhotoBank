import {Card, Image, Input, Modal, Pagination} from "antd";
import React, { Fragment, useState } from "react";
import { useyDiskPagination, yDiskPagination } from "./__generated__/testQuery";
import "antd/dist/antd.css";
import { EditOutlined } from "@ant-design/icons";



export const YDiskFiles = () => {

    const [showModal, setShowModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState<string>()
    const { data, loading, error } = useyDiskPagination()

    if (loading) return <div>Loading...</div>;
    if (error) return <div>`Errors is ${error}`</div>;


    function getSelectedItem() {
        return data?.ydiskPagination.items
            .filter(item => item.path === selectedItem)[0];
    }

    function getTitle(path: string) {
        let titleSplit = path?.split("/");
        if (titleSplit && titleSplit.length > 0) {
            return titleSplit[titleSplit.length - 1];
        } else {
            return "";
        }
    }

    const onShowSizeChange = (current, pageSize) => {
        console.log(current, pageSize);
    };

    return (
        <div style={{width: "100%"}}>
            <Pagination style={{width: '100%'}}  defaultCurrent={1} total={data?.ydiskPagination.total} showSizeChanger onShowSizeChange={onShowSizeChange}/>
            <div style={{ display: 'flex' }}>
                {data?.ydiskPagination.items.map(key => {
                        return <Card
                            size="small"
                            title={getTitle(key?.path)}
                            hoverable
                            style={{width: 200, height: 200, margin: 20}}
                            cover={<Image width={'100%'} height={200} src={key.preview}/>}
                            actions={[
                                <EditOutlined key="edit" onClick={() => {
                                    setShowModal(true)
                                    setSelectedItem(key.path)
                                }}/>,
                            ]}
                        >
                        </Card>;
                    }
                )}
                <Modal title={getTitle(getSelectedItem()?.path)} visible={showModal} onOk={() => setShowModal(false)} onCancel={() => setShowModal(false)}>
                    <Input defaultValue={getSelectedItem()?.path}/>
                </Modal>
            </div>

        </div>
    );

}