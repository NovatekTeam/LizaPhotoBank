import React from "react";
import {Tree} from "antd";
import {usefilterTree} from "./__generated__/filterTree";

export const TagsFilter = (props: {select: (selectedKeys: string[]) => void}) => {

    const { data, loading, error } = usefilterTree();

    let tagGroup = data?.TagsQuery?.map(it => it.tagGroup);
    let distinctTagGroup = tagGroup?.filter((it , pos) => tagGroup.indexOf(it) == pos)?.sort();

    function findTagByGroup(group: string) {
        let map = data?.TagsQuery?.filter(it => it.tagGroup === group).map(it => ({
            key: it.tagName,
            title: it.tagName,
        }));
        console.log(map)
        return map
    }

    let treeData = distinctTagGroup?.map(it => {
        let childrens = findTagByGroup(it);
        return ({
            key: it,
            title: it,
            children: childrens.length > 1 ? childrens: []
        });
    });

    const onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };

    const onCheck = (checkedKeys, info) => {
        props.select(checkedKeys)
        console.log('onCheck', checkedKeys, info);
    };

    let a;
    console.log(treeData)
    return (
        <div style={{width: '15%', padding: "12px", minWidth:"200px"}}>
            <img src={"https://lizaalert.org/wp-content/uploads/2018/10/ll5-122x51.png"} alt={"logo"}/>
            <h2 style={{textAlign: "left", padding: "12px"}}>Фильтры:</h2>
            <Tree
                checkable
                onSelect={onSelect}
                onCheck={onCheck}
                treeData={treeData ? treeData : a}
            />
        </div>
    )
}