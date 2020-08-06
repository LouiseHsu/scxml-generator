import React, { useState } from 'react';
import './ExitTab.css'
import EventItem from "../EventItem";

function ExitTab({exits, createExit}) {

    const [content, setContent] = useState("");
    const [event, setEvent] = useState("");
    const [type, setType] = useState("");
    const [target, setTarget] = useState("");

    const [currTag, setCurrTag] = useState("log");

    return (
        <div className={"exit-tab"}>
            <div className={"exit-select"}>
                <select onChange={event => setCurrTag(event.target.value)}>
                    <option value={"log"}>Log</option>
                    <option value={"raise"}>Raise</option>
                    <option value={"send"}>Send</option>
                </select>
            </div>
            <div style={{display : currTag === "log" ? 'block' : 'none'}} className={"exit-log-inputs"}>
                <input value={content} onChange={event => setContent(event.target.value)} placeholder={"content"}/>
                <button onClick={() => createExit(currTag, content, event, target, type)}>Create!</button>
            </div>
            <div style={{display : currTag === "raise" ? 'block' : 'none'}} className={"exit-raise-inputs"}>
                <input value={event} onChange={event => setEvent(event.target.value)} placeholder={"event"}/>
                <button onClick={() => createExit(currTag, content, event, target, type)}>Create!</button>
            </div>
            <div style={{display : currTag === "send" ? 'block' : 'none'}} className={"exit-raise-inputs"}>
                <input value={type} onChange={event => setType(event.target.value)} placeholder={"type"}/>
                <input value={target} onChange={event => setTarget(event.target.value)} placeholder={"target"}/>
                <input value={content} onChange={event => setContent(event.target.value)} placeholder={"content"}/>
                <button onClick={() => createExit(currTag, content, event, target, type)}>Create!</button>
            </div>
            <div className={"exit-list"}>
                {exits.map((item, index) => (
                    <EventItem key = {index} item = {item}/>
                ))}
            </div>
        </div>
    )
}

export default ExitTab