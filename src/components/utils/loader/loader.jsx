import React from 'react';
import './loader.css';

const Loader = (props) => {
    return (
        <div className="loader" style={{fontSize: props.size}}>Loading...</div>
    )
};

export {Loader}