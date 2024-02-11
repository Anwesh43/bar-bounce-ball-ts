import { useAnimatedScale, useDimension } from "./hooks";
import React from "react";

const withContext = (MainFC : React.FC<any>) : React.FC<any> => {
    return (props : any) => {
        const {w, h} = useDimension()
        const {scale, start : onClick} = useAnimatedScale()
        const newProps = {
            ...props,
            scale, 
            w, 
            h, 
            onClick 
        }
        return (<MainFC {...newProps}></MainFC>)
    }
}

export default withContext