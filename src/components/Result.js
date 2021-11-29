import React from 'react';
import Badge from 'react-bootstrap/Badge';

const Result = ({ success }) => {
    let bg;

    switch (success) {
        case 'Busy':
            bg = 'info';
            break;

        case 'Success':
            bg = 'success';
            break;

        case 'Failed':
            bg = 'danger';
            break;

        case 'Diff':
            bg = 'warning';
            break;

        default:
            bg = 'dark';
            break;
    }

    return (
        <Badge data-cy="result" pill bg={bg}>
            {success}
        </Badge>
    );
};

export default Result;
