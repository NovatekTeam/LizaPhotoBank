import { Button } from "antd"
import React, { Fragment } from "react"
import { usesyncDb, usesyncDbLazyQuery } from "./__generated__/syncWithDb"
import { usesyncYdisk, usesyncYdiskLazyQuery } from "./__generated__/syncWithYdisk"

export const ButtonPanel: React.FC = () => {

    function syncDb() {

        startSync().then(data =>
            alert(data.data?.syncSolrWDb)
        )



    }

    function syncYdisk() {
        startSyncYdisk().then(
            res => alert(res.data?.syncFiles)
        )

    }


    function handleAuto() {
        alert('Auto marking starting')
    }

    const [startSync] = usesyncDbLazyQuery()
    const [startSyncYdisk] = usesyncYdiskLazyQuery()


    return (
        <Fragment>
            <Button type="primary" style={{ marginLeft: 16, marginRight: 16, marginTop: 16 }} onClick={syncYdisk}>Синхронизация с облаком</Button>
            <Button type="primary" style={{ marginLeft: 16, marginRight: 16, marginTop: 16 }} onClick={syncDb}>Синхронизация с индексом</Button>
            <Button type="primary" style={{ marginLeft: 16, marginRight: 16, marginTop: 16 }} onClick={handleAuto}>Авто разметка</Button>
        </Fragment>
    )
}