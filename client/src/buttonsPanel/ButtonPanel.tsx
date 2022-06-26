import { Button } from "antd"
import React,{ Fragment } from "react"
import { usesyncDb } from "./__generated__/syncWithDb"
import { usesyncYdisk } from "./__generated__/syncWithYdisk"

export const ButtonPanel : React.FC = () => {

    function syncDb(){
        console.log('afaf')
        // const {data,loading,error} = usesyncDb()
        // alert(data)
    }

    function syncYdisk(){
        //const {data,loading,error} = usesyncYdisk()
        alert('Files synced')
    }


    function handleAuto() {

    }

    return (
        <Fragment>
            <Button type="primary" style={{margin: 16}} onClick={syncYdisk}>Синхронизация с облаком</Button>
            <Button type="primary" style={{margin: 16}} onClick={syncDb}>Синхронизация с индексом</Button>
            <Button type="primary" style={{margin: 16}} onClick={handleAuto}>Авто разметка</Button>
        </Fragment>
    )
}