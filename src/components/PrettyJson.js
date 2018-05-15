import React from 'react';

function PrettyJson(props) {
    return (
      <pre>{JSON.stringify(props.json, null, 2) }</pre>
    );
  }

export default PrettyJson; 