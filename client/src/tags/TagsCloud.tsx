import React from "react";
import ReactWordcloud, {Word} from "react-wordcloud";
import {usefilterTree} from "./__generated__/filterTree";

export const TagsCloud = () => {

    const filter = usefilterTree();
    let words = filter?.data?.TagsQuery?.map(it => ({
        text: it?.tagName,
        value: it?._count?.medias
    }));

    const callbacks = {
        getWordColor: (word: Word) => (word.value > 50 ? "orange" : "purple"),
        getWordTooltip: (word: Word) =>
            `${word.value}`,
        onWordClick:  (word: Word, event?: MouseEvent) =>
            window.open(`https://duckduckgo.com/?q=${word.text}`, "_blank"),
    };

    return (
        <div >
            <ReactWordcloud callbacks={callbacks} words={words} />
        </div>
    )

}