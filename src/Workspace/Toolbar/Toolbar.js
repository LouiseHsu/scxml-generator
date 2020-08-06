import React from 'react';
import './Toolbar.css';
import {ToolTypes} from "../../ToolTypes";
import {FaMousePointer} from "react-icons/all";
import {FaHandPaper} from "react-icons/all";

function Toolbar({createNewState, setToolbarState}) {
    return (
        <div className={"toolbar"}>
            <div className={"toolbar-inner-container"}>
                <button onClick={() => {createNewState(); setToolbarState(ToolTypes.STATE)}} className={"state-button toolbar-button"}>State</button>
                <button onClick={() => setToolbarState(ToolTypes.TRANSITION)} className={"transition-button toolbar-button"}>Transition</button>
                <button onClick={() => setToolbarState(ToolTypes.DRAG)} className={"drag-button toolbar-button"}><FaHandPaper/></button>
                <button onClick={() => setToolbarState(ToolTypes.POINTER)} className={"pointer-button toolbar-button"}><FaMousePointer/></button>
            </div>
        </div>
    )
}

export default Toolbar;