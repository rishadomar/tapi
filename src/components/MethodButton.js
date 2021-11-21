import React from 'react';
import Button from 'react-bootstrap/Button';

const MethodButton = ({ apiEntry, onClick }) => {
    return (
        <Button 
            onClick={() => onClick(apiEntry)}
            variant="primary"
        >
            {apiEntry.method}
        </Button>
    );
};

export default MethodButton;
