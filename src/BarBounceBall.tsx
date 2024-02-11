import React from "react";
import { useStyle } from "./hooks";
import withContext from "./withContext";

export interface BarBounceBallProps {
    w : number, 
    h : number, 
    scale : number, 
    onClick : () => void 
}
const BarBounceBall : React.FC<BarBounceBallProps> = (props : BarBounceBallProps) => {
    const {parentStyle, circleStyle, barStyle} = useStyle(props.w, props.h, props.scale)
    return (
        <div style = {parentStyle()}>
            <div style = {circleStyle()}>
            </div>
            <div style = {barStyle()} onClick = {() => props.onClick()}>
            </div>
        </div>
    )
}

export default withContext(BarBounceBall)