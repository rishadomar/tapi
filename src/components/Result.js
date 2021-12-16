import React from 'react';
import { Bug, CheckLg, Clock, FileDiff, Question } from 'react-bootstrap-icons';
import Badge from 'react-bootstrap/Badge';

const Result = ({ success }) => {
    let bg;
    let icon;

    switch (success) {
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

    if (success) {
        return (
            <>
                {icon}
                <Badge className="p-2" data-cy="result" pill bg={bg}>
                    {success}
                </Badge>
            </>
        );
    } else {
        return <></>;
    }
};

export default Result;
