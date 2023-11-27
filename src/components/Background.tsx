import React from 'react';
import {Box} from "native-base";

const Background = ({onClose}) => {
    return (
        <Box onTouchEnd={onClose} style={{
            position: 'absolute',
            opacity: 0.3,
            top: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#050505'
        }}/>
    );
};

export default Background;