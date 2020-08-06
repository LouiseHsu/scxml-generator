import React from 'react';
import './EventItem.css';

function EventItem(props, index) {

    function getEntryDisplay(item) {
        switch (item.tag) {
            case "log":
                return "<log content = \"" + item.content +"\"/>"
            case "raise":
                return "<raise event = \"" + item.event +"\"/>"
            case "send":
                return "<send type =\"" + item.type + "\" target=\"" + item.target + "\">"
                        + "\n <content expr=\"" + item.content + "\"/>"
                        + "\n </send>"
            default:
                console.log("check tag")

        }
        return "";
    }

    return (
        <div className={"entry-event-item"}>
            {getEntryDisplay(props.item)}
        </div>
    )
}

export default EventItem;
