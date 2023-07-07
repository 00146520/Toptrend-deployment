import React from "react";

const IndicatorElement = (props)=>{
    return <>
        <div className={`w-full flex flex-col justify-between items-center ${props.className}`}>
            <p className="w-full mb-2">{props.title}</p>
            <div className={`${props.color} text-white w-52 h-20 rounded-xl flex items-center justify-center`} >{
                props.value}
            </div>
        </div>
    </>
}

export default IndicatorElement;