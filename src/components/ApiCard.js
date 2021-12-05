import Json from 'components/Json';
import MethodButton from 'components/MethodButton';
import Result from 'components/Result';
import { ApiContext } from 'context/apisContext';
import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
import Error from './Error';

const ApiCard = ({ apiEntry }) => {
    const { executeApi } = useContext(ApiContext);
    const uniqueId = `entry-${apiEntry.id}`;
    const [open, setOpen] = useState(false);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState(null);

    const execute = (apiEntry) => {
        setBusy(true);
        executeApi(apiEntry)
            .then(() => {})
            .catch((message) => {
                setError(message);
            })
            .finally(() => {
                setBusy(false);
            });
    };

    return (
        <Card id={apiEntry.name.replace('.json', '')}>
            <Card.Header><strong>{apiEntry.description}</strong>&nbsp;({apiEntry.name})</Card.Header>
            <Card.Body>
                <Card.Text>
                    {apiEntry.api}
                </Card.Text>
                <Button variant="link" onClick={() => setOpen(!open)}>
                    {open ? 'Collapse' : 'Show'}
                </Button>
                <MethodButton busy={busy} onClick={execute} apiEntry={apiEntry} />
                <Result success={apiEntry.status} />
                {error && <Error error={error} />}
                <Collapse in={open}>
                    <div id={uniqueId}>
                        <Json title="Expected" entry={apiEntry.expectedResponse} />
                        {apiEntry.executeResult && <Json title="Result JSON" entry={apiEntry.executeResult} />}
                    </div>
                </Collapse>
            </Card.Body>
        </Card>
    );
};

export default ApiCard;
