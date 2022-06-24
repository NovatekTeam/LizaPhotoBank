import React from "react";
import ReactWordcloud, {Word} from "react-wordcloud";
import {words} from "./TagsExample";

export const TagsCloud = () => {

    const callbacks = {
        getWordColor: (word: Word) => (word.value > 50 ? "orange" : "purple"),
        getWordTooltip: (word: Word) =>
            `Таг "${word.text}" встречается ${word.value} раз.`,
        onWordClick:  (word: Word, event?: MouseEvent) =>
            window.open(`https://duckduckgo.com/?q=${word.text}`, "_blank"),
    };

    return (
        <div style={{ height: '400px', width: "50%"}}>
            <ReactWordcloud callbacks={callbacks} words={words} />
        </div>
    )

}