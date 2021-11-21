import React from 'react';
import Badge from 'react-bootstrap/Badge';

const Result = ({ success }) => {
    if (success === 'Busy') {
        return <Badge pl="5" pill bg="info">{success}</Badge>;
    }

    if (success === 'Success') {
        return <Badge pl="5" pill bg="success">{success}</Badge>;
    }

    if (success === 'Failed') {
        return <Badge pill bg="danger">{success}</Badge>;
    }

    if (success === 'Diff') {
        return <Badge pill bg="warning">{success}</Badge>;
    }

    return <Badge pill bg="dark">{success}</Badge>;
};

export default Result;
