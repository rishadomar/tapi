import React from 'react';
import { Bug, CheckLg, Clock, FileDiff, Question } from 'react-bootstrap-icons';
import Badge from 'react-bootstrap/Badge';
import Error from './Error';

const Result = ({ status, error }) => {
    let bg;
    let icon;

    switch (status) {
        case 'Busy':
            icon = <Clock className="mx-3" />;
            bg = 'info';
            break;

        case 'Success':
            icon = <CheckLg className="mx-3" />;
            bg = 'success';
            break;

        case 'Failed':
            icon = <Bug className="mx-3" />;
            bg = 'danger';
            break;

        case 'Diff':
            icon = <FileDiff className="mx-3" />;
            bg = 'warning';
            break;

        default:
            icon = <Question className="mx-3" />;
            bg = 'dark';
            break;
    }

    if (status) {
        return (
            <>
                {icon}
                <Badge className="p-2" data-cy="result" pill bg={bg}>
                    {status}
                </Badge>
                {error && <Error error={error} />}
            </>
        );
    } else {
        return <></>;
    }
};

export default Result;
