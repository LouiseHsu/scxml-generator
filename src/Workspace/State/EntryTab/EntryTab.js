import React, { useState } from 'react';
import './EntryTab.css'
import EventItem from "../EventItem";

function EntryTab({entries, createEntry}) {

    const [content, setContent] = useState("");
    const [event, setEvent] = useState("");
    const [type, setType] = useState("");
    const [target, setTarget] = useState("");

    const [currTag, setCurrTag] = useState("log");

    return (
        <div className={"entry-tab"}>
            <div className={"entry-select"}>
                <select onChange={event => setCurrTag(event.target.value)}>
                    <option value={"log"}>Log</option>
                    <option value={"raise"}>Raise</option>
                    <option value={"send"}>Send</option>
                </select>
            </div>
            <div style={{display : currTag === "log" ? 'block' : 'none'}} className={"entry-log-inputs"}>
                <input value={content} onChange={event => setContent(event.target.value)} placeholder={"content"}/>
                <button onClick={() => createEntry(currTag, content, event, target, type)}>Create!</button>
            </div>
            <div style={{display : currTag === "raise" ? 'block' : 'none'}} className={"entry-raise-inputs"}>
                <input value={event} onChange={event => setEvent(event.target.value)} placeholder={"event"}/>
                <button onClick={() => createEntry(currTag, content, event, target, type)}>Create!</button>
            </div>
            <div style={{display : currTag === "send" ? 'block' : 'none'}} className={"entry-send-inputs"}>
                <input value={type} onChange={event => setType(event.target.value)} placeholder={"type"}/>
                <input value={target} onChange={event => setTarget(event.target.value)} placeholder={"target"}/>
                <input value={content} onChange={event => setContent(event.target.value)} placeholder={"content"}/>
                <button onClick={() => createEntry(currTag, content, event, target, type)}>Create!</button>
            </div>
            <div className={"entry-list"}>
                {entries.map((item, index) => (
                    <EventItem key = {index} item = {item}/>
                ))}
            </div>
        </div>
    )
}

export default EntryTab;