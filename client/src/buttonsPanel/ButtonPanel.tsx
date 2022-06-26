import { Button } from "antd"
import React, { Fragment } from "react"
import { usesyncDb, usesyncDbLazyQuery } from "./__generated__/syncWithDb"
import { usesyncYdisk } from "./__generated__/syncWithYdisk"

export const ButtonPanel: React.FC = () => {

    function syncDb() {        
      
        startSync().then(data => 
            alert(data.data?.syncSolrWDb)   
        )
        
        
        
    }

function syncYdisk() {
    //const {data,loading,error} = usesyncYdisk()
    alert('Files synced')
}


function handleAuto() {

}

const [startSync] = usesyncDbLazyQuery()


return (
    <Fragment>
        <Button type="primary" style={{ marginLeft: 16, marginRight: 16, marginTop: 16 }} onClick={syncYdisk}>Синхронизация с облаком</Button>
        <Button type="primary" style={{ marginLeft: 16, marginRight: 16, marginTop: 16 }} onClick={syncDb}>Синхронизация с индексом</Button>
        <Button type="primary" style={{ marginLeft: 16, marginRight: 16, marginTop: 16 }} onClick={handleAuto}>Авто разметка</Button>
    </Fragment>
)
}