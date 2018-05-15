import React from 'react';

function PowerButton(props) {
    return (
      <button className='elem' onClick={props.onClick}>
      {props.Name}
      </button>
    );
  }

export default PowerButton; 