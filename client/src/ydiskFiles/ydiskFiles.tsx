import { Card, Image, Input, Modal } from "antd";
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


    return (
        <div style={{ display: 'flex' }}>
            {data?.ydiskPagination.items.map(key =>
                <Card
                    size="small"
                    title={key.path}
                    hoverable
                    style={{ width: 200, height: 200, margin: 20 }}
                    cover={<Image width={'100%'} height={200} src={key.preview} />}
                    actions={[
                        <EditOutlined key="edit" onClick={() => {
                            setShowModal(true)
                            setSelectedItem(key.path)
                        }} />,
                    ]}
                >
                </Card>
            )}
            <Modal title='Edit card' visible={showModal} onOk={() => setShowModal(false)} onCancel={() => setShowModal(false)}>
                <Input defaultValue={data?.ydiskPagination.items
                    .filter(item => item.path === selectedItem)
                    .map(item => item.path)}/>
            </Modal>
        </div>
    );

}