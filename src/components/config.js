import React from 'react';
import ConfigElement from './configElement';
import _ from 'underscore'

function Config(props) {
    const json = props.Data;
    if(_.isEmpty(json))
        return (<div />);
    const last = props.Last;
    if(_.isEmpty(last))
        return (<div />);
    var elems = [
        {Name: "Mode", Elements: json.climate_modes, Id: "climate_mode"},
        {Name: "Temperature", Elements: Array(json.max_temp - json.min_temp + 1).fill(0).map((x, y) => x + y + json.min_temp), Id: "temperature"},
        {Name: "Fan Speed", Elements: json.fan_modes, Id: "fan_mode"},
        {Name: "Vertical Vane", Elements: json.vanne_vertical_modes, Id: "vanne_vertical_mode"},
        {Name: "Area", Elements: json.area_modes, Id: "area_mode"},
        {Name: "Horizontal Vane", Elements: json.vanne_horizontal_modes, Id: "vanne_horizontal_mode"},
        {Name: "Powerful", Elements: json.powerful_modes, Id: "powerful_mode"},
        {Name: "ISee", Elements: json.isee_modes, Id: "isee_mode"}
    ];
    return (
    <div className='rowC'>
        {elems.map(function(listValue){
            return (
            <ConfigElement 
            Name={listValue.Name} 
            Elements={listValue.Elements} 
            Selected={last[listValue.Id]} 
            onClick={(x) => props.onClick(listValue.Id, x)}
            />);
        })}   
    </div>
    )
}

export default Config; 