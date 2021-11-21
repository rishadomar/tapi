import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const BusySpinner = ({ text }) => {
    return (
        <Spinner animation="border" role="status">
            <span className="visually-hidden">{text}</span>
        </Spinner>
    );
};

export default BusySpinner;
