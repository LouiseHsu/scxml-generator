import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import React, {useEffect, useState} from 'react';
import EntryTab from './EntryTab/EntryTab'
import ExitTab from './ExitTab/ExitTab'
import {useDrag } from 'react-dnd'
import { ItemTypes} from "../../ItemTypes";
import './State.css'

function State({id, updateState, data, canDrag, setDraggedState, deleteState}) {
    const [{isDragging}, drag] = useDrag({
        item: { data, type: ItemTypes.STATE },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
        canDrag : canDrag
    })

    const [isDraggingDelayed, setIsDraggingDelayed] = React.useState(false);
    React.useEffect(() => {
        setImmediate(() => setIsDraggingDelayed(isDragging)); // or setTimeout(, 0) without polyfill
    }, [isDragging]);

    const [stateDimension, setStateDimension] = useState({"width" : 0,
                                                                    "height" : 0})

    useEffect( () => {
        setStateDimension({
            "width" : document.getElementById("state" + id).offsetWidth,
            "height" : document.getElementById("state" + id).offsetHeight
        })

    }, [id])

    // data states
    const [listOfEntries, setListOfEntries] = useState([]);
    const [listOfExits, setListOfExits] = useState([]);
    const [name, setName] = useState("");
    const createNewEntry = (currTag, content, event, target, type) => {
        let newEntries;
        switch (currTag) {
            case "log":
                newEntries = [...listOfEntries, {
                    "tag" : "log",
                    "content" : content
                }]
                setListOfEntries(newEntries);
                break;
            case "raise":
                newEntries = [...listOfEntries, {
                    "tag" : "raise",
                    "event" : event
                }]
                setListOfEntries(newEntries);
                break;
            case "send":
                newEntries = [...listOfEntries, {
                    "tag" : "send",
                    "content" : content,
                    "target" : target,
                    "type" : type
                }]
                setListOfEntries(newEntries);
                break;
            default:
                console.log("check create entry")
        }
        updateState(id, name, newEntries, listOfExits);
    }

    const createNewExit = (currTag, content, event, target, type) => {
        let newExits;

        switch (currTag) {
            case "log":
                newExits = [...listOfExits, {
                    "tag" : "log",
                    "content" : content
                }]
                setListOfExits(newExits);
                break;
            case "raise":
                newExits = [...listOfExits, {
                    "tag" : "raise",
                    "content" : event
                }]
                setListOfExits(newExits);
                break;
            case "send":
                newExits = [...listOfEntries, {
                    "tag" : "send",
                    "content" : content,
                    "target" : target,
                    "type" : type
                }]
                setListOfExits(newExits);
                break;
            default:
                console.log("check create exit")
        }
        updateState(id, name, listOfEntries, newExits);
    }

    const updateName = (name) => {
        setName(name);
        updateState(id, name, listOfEntries, listOfExits);
    }

    return (
        <div className={"state-draggable-container"}
             ref={drag}
             style={{
                 left : data.left,
                 top : data.top,
                 // hacky way to get child dimensions, ref doesn't work on Tabs
                 width : stateDimension.width,
                 height : stateDimension.height,
                 cursor : canDrag? "grab" : "inherit"
             }}
             onMouseDown={() => setDraggedState(data)}>
            <Tabs
                  className={data.type}
                  id={"state" + id}
                  style={{
                      left : data.left,
                      top : data.top,
                      opacity: isDraggingDelayed ? 0 : 1}
                  }>
                <TabList className={"state-tabs"}>
                    <Tab className={"state-tab"} selectedClassName={"state-tab-selected"}>Main</Tab>
                    <Tab className={"state-tab"} selectedClassName={"state-tab-selected"}>Entry</Tab>
                    <Tab className={"state-tab"} selectedClassName={"state-tab-selected"}>Exit</Tab>
                </TabList>
                <TabPanel className={"state-body"} selectedClassName={"state-body-selected"}>
                    <button onClick={() => deleteState(id)} className={"state-delete"}>x</button>
                    <input className={"state-name-input"} placeholder={"Name"} value={name} onChange={event => updateName(event.target.value)}/>
                </TabPanel >
                <TabPanel className={"state-body state-entry-tab"} selectedClassName={"state-body-selected"}>
                    <EntryTab entries={listOfEntries} createEntry={createNewEntry}/>
                </TabPanel>
                <TabPanel className={"state-body state-exit-tab"} selectedClassName={"state-body-selected"}>
                    <ExitTab exits={listOfExits} createExit={createNewExit}/>
                </TabPanel>
            </Tabs>
        </div>
    )
}

export default State;