//import { Popover } from 'bootstrap';
import * as ProjectConstants from 'projectConstants';
import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

const methodTypes = [
    {
        method: ProjectConstants.MethodGet,
        variant: 'success',
    },
    {
        method: ProjectConstants.MethodPost,
        variant: 'secondary',
    },
    {
        method: ProjectConstants.MethodPut,
        variant: 'warning',
    },
    {
        method: ProjectConstants.MethodDelete,
        variant: 'danger',
    },
];

const MethodButton = ({ busy, onClick, apiEntry }) => {
    const foundMethodType = methodTypes.find(
        (m) => m.method === apiEntry.method
    );

    if (!foundMethodType) {
        return (
            <OverlayTrigger
                overlay={<Tooltip id="tooltip-disabled">Invalid Method Type</Tooltip>}
            >
                <span className="d-inline-block">
                    <Button disabled style={{ pointerEvents: 'none' }}>
                        {apiEntry.method}
                    </Button>
                </span>
            </OverlayTrigger>
        );
    }

    if (busy) {
        return (
            <Button variant={foundMethodType.variant} disabled>
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
        return (
            <Button
                onClick={() => onClick(apiEntry)}
                variant={foundMethodType.variant}
            >
                {apiEntry.method}
            </Button>
        );
    }
};

export default MethodButton;
