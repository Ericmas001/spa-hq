import React from 'react';

function ConfigElement(props) {
    return (
        <div className='elem'>
            <center><h3>{props.Name}</h3></center>
            <ul>
            {props.Elements.map(function(listValue){
                if(props.Selected === listValue)
                    return <li class="remote-elem-selected">{listValue}</li>;
                else
                    return <li class="remote-elem"><button onClick={() => props.onClick(listValue)}>{listValue}</button></li>;
            })}
            </ul>
        </div>
        );
      }

export default ConfigElement; 