import React from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

const MethodButton = ({ busy, onClick, apiEntry }) => {
    if (busy) {
        return (
            <Button variant="primary" disabled>
                <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                Loading...
            </Button>
        );
    } else {
        return <Button onClick={() => onClick(apiEntry)} variant="primary">{apiEntry.method}</Button>;
    }
};

export default MethodButton;
