import React from 'react';
const Result = ({ success }) => {
    if (success === 'Busy') {
        return <span className="badge badge-info-400 mr-3">{success}</span>;
    }

    if (success === 'Success') {
        return <span className="badge badge-success-400 mr-3">{success}</span>;
    }

    if (success === 'Failed') {
        return <span className="badge badge-danger-400 mr-3">{success}</span>;
    }

    if (success === 'Diff') {
        return <span className="badge badge-warning-400 mr-3">{success}</span>;
    }

    return <span className="badge badge-info-400 mr-3">{success}</span>;
};

export default Result;
