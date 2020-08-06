import React, {useState} from 'react';
import './Transition.css'

function Transition({data}) {
    const [transitionName, setTransitionName] = useState("");
    const midpointX = () => {
        return (data.x1 + data.x2)/2
    }

    const midpointY = () => {
        return (data.y1 + data.y2)/2 + 50
    }

    return (
        <>
            <line style={{
                stroke : "black",
                strokeWidth : 4,
                markerEnd : "url(#arrow)"
            }} x1={data.x1} y1={data.y1 + 50}  x2={midpointX()}  y2={midpointY()} />
            <line style={{
                stroke : "black",
                strokeWidth : 4,
            }} x1={midpointX()} y1={midpointY()}  x2={data.x2}  y2={data.y2 + 50} />
            <foreignObject width="100" height="150">
                <div >
                    <input
                        onChange={(e) => setTransitionName(e.target.value)}
                        placeholder={"Transition Name"}
                        style={{
                            left : midpointX(),
                            top : midpointY() + 20,
                            position: "fixed",
                            border: transitionName === "" ? "auto" : "none",
                            backgroundColor: transitionName === "" ? "white" : "#fafafa"
                        }
                    }/>
                </div>
            </foreignObject>
        </>
    )

}
export default Transition;