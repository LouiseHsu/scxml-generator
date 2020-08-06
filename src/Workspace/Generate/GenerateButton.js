import React, {useState} from "react";
import './GenerateButton.css';

function GenerateButton({states, transitions}) {

    const generate = () => {
        let result = "";
        console.log(states())
        states().forEach(state => {
            result += generateEntries(state);
        })
        console.log(result);
    }

    const generateEntries = (state) => {
        let result = "<onentry>";
        console.log(state)
        state.entries.forEach(entry => {
            console.log(entry.tag)
            switch (entry.tag) {
                case "log":
                    result += "<log content = \"" + entry.content +"\"/>\n"
                    break;
                case "raise":
                    result += "<raise event = \"" + entry.event +"\"/>\n"
                    break;
                case "send":
                    result += "<send type =\"" + entry.type + "\" target=\"" + entry.target + "\">"
                        + "\n <content expr=\"" + entry.content + "\"/>"
                        + "\n </send>\n"
                    break;
                default:
                    console.log("check tag")
            }
        })
        result += "</onentry>"
        return result;
    }

    return (
        <button onClick={() => generate()} className={"generate-button"}>Generate SCXML!</button>
    )
}

export default GenerateButton;