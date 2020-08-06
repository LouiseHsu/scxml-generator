import React, {useState} from 'react';
import State from './State/State'
import Toolbar from './Toolbar/Toolbar'
import {useDrop} from 'react-dnd'
import './Workspace.css'
import {ItemTypes} from "../ItemTypes";
import {ToolTypes} from "../ToolTypes";
import Transition from "./Transition/Transition";
import GenerateButton from "./Generate/GenerateButton";
import {StateTypes} from "../StateTypes";

function Workspace() {

    // ui states
    const [activeTool, setTool] = useState(ToolTypes.POINTER);

    // data states
    const [listOfStates, setListOfStates] = useState([]);
    const [listOfTransitions, setListOfTransitions] = useState([]);

    // interaction states
    const [clickedState, setClickedState] = useState({
        id: null,
        x: 0,
        y: 0
    })

    const [, drop] = useDrop({
        accept: ItemTypes.STATE,
        drop(item, monitor) {
            const delta = monitor.getDifferenceFromInitialOffset()
            const left = Math.round(item.data.left + delta.x)
            const top = Math.round(item.data.top + delta.y)
            updateStatePosition(item.data.id, left, top)
            updateTransitionPosition(item.data.id, left, top)
            return undefined
        },
    })

    const setToolbarState = (tooltype) => {
        setTool(tooltype);
        tooltype = true;
    }

    const setTransitionState = (data) => {
        // not in a transition state
        if (activeTool !== ToolTypes.TRANSITION) {
            return;
        }
        // another state was already clicked, so make a transition line
        if (clickedState.id !== null && clickedState.id !== data.id) {
            let newTransitions = [...listOfTransitions, {

                sid1: clickedState.id,
                sid2 : data.id,
                x1: clickedState.x,
                y1: clickedState.y,
                x2: data.left,
                y2: data.top
            }]
            setListOfTransitions(newTransitions);
            setClickedState({
                id: null,
                x: 0,
                y: 0
            });

            return
        }
        // else, this is the first state to be clicked
        setClickedState({
            id: data.id,
            x: data.left,
            y: data.top
        });
    }

    let testState = {
        "id": listOfStates.length + "" + Date.now(),
        "name": "",
        "entries": [],
        "exits": [],
        "left": 200 + listOfStates.length * 150,
        "top": 20 + listOfStates.length * 100,
        "states": []
    }

    const createNewState = (type) => {
        let newStates = [...listOfStates, {
            "id": listOfStates.length + "" + Date.now(),
            "type": StateTypes.FINAL,
            "name": "",
            "entries": [],
            "exits": [],
            "left": 200 + listOfStates.length * 150,
            "top": 20 + listOfStates.length * 100,
        }]
        setListOfStates(newStates);
    }


    // remember states are immutable!
    const updateState = (id, name, entries, exits) => {
        let index = listOfStates.findIndex((e) => {
            return e.id === id;
        })
        let newStates = listOfStates.slice();
        newStates[index] = {
            "id": newStates[index].id,
            "name": name,
            "entries": entries,
            "exits": exits,
            "left": newStates[index].left,
            "top": newStates[index].top
        }
        setListOfStates(newStates);
    }

    const updateStatePosition = (id, left, top) => {
        let index = listOfStates.findIndex((e) => {
            return e.id === id;
        })
        let newStates = listOfStates.slice();
        newStates[index] = {
            "id": newStates[index].id,
            "name": newStates[index].name,
            "entries": newStates[index].entries,
            "exits": newStates[index].exits,
            "left": left,
            "top": top
        }
        setListOfStates(newStates);
    }

    const deleteState = (id) => {
        let newStates = listOfStates.slice();
        newStates = newStates.filter((s) => {
            return s.id !== id;
        })
        let newTransitions = listOfTransitions.slice();
        newTransitions = newTransitions.filter((t) => {
            return t.sid1 !== id && t.sid2 !== id
        })
        setListOfStates(newStates);
        setListOfTransitions(newTransitions);
    }

    const updateTransitionPosition = (stateId, x, y) => {
        let newTransitions = listOfTransitions.slice();
        listOfTransitions.forEach((t, i) => {
            if (t.sid1 === stateId) {
                newTransitions[i] = {
                    sid1: listOfTransitions[i].sid1,
                    sid2: listOfTransitions[i].sid2,
                    x1: x,
                    y1: y,
                    x2: newTransitions[i].x2,
                    y2: newTransitions[i].y2
                }
            }
            if (t.sid2 === stateId) {
                newTransitions[i] = {
                    sid1: listOfTransitions[i].sid1,
                    sid2: listOfTransitions[i].sid2,
                    x1: newTransitions[i].x1,
                    y1: newTransitions[i].y1,
                    x2: x,
                    y2: y,
                }
            }
        })
        setListOfTransitions(newTransitions)
    }

    const getCurrStates = () => {
        return listOfStates;
    }

    return (
        <div
            ref={drop}
            className={"workspace"}
            style={{cursor: activeTool === ToolTypes.TRANSITION ? "crosshair" : "auto"}}>
            <Toolbar createNewState={createNewState} setToolbarState={setToolbarState}/>
            {listOfStates.map((item, index) => (
                <State
                    setDraggedState={setTransitionState}
                    key={ item.id}
                    id={ item.id}
                    updateState={updateState}
                    deleteState={deleteState}
                    data={item}
                    canDrag={activeTool === ToolTypes.DRAG}
                />
            ))}
            <svg  style={{
                width : "calc(100vw - 127px)",
                height : "100vh",
                float : "right"
            }}>
                <defs>
                    <marker id="arrow" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L0,6 L9,3 z" fill="black" />
                    </marker>
                </defs>
                {listOfTransitions.map((item, index) => (
                    <Transition key={index} data={item}/>
                ))}
            </svg>
            <GenerateButton
                states = {getCurrStates}
                transitions = {listOfTransitions}
            />
        </div>
    );
}

export default Workspace;