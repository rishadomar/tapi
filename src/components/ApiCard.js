import Json from 'components/Json';
import MethodButton from 'components/MethodButton';
import Result from 'components/Result';
import { ApiContext } from 'context/apisContext';
import React, { useContext, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { ChevronDown, ChevronUp } from 'react-bootstrap-icons';
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

    /**
     * Render Body
     * @returns 
     */
    const renderCardBody = () => {
        return (
            <>
                <Card.Text>{apiEntry.api}</Card.Text>
                <MethodButton busy={busy} onClick={execute} apiEntry={apiEntry} />
                <Result success={apiEntry.status} />
                {error && <Error error={error} />}
            </>
        );
    };

    /**
     * Render Response section
     * @returns 
     */
    const renderResponse = () => {
        return (
            <>
                <Button className="mb-3 text-dark" variant="link" onClick={() => setOpen(!open)}>
                    {open ? 'Hide response' : 'Show response'}
                    {open ? <ChevronUp className="mx-4" /> : <ChevronDown className="mx-4" />}
                </Button>
                <Collapse in={open}>
                    <Container fluid id={uniqueId}>
                        <Row>
                            <Col>
                                <Json title="Expected Response" entry={apiEntry.expectedResponse} />
                            </Col>
                            <Col>{apiEntry.executeResult && <Json title="Actual Response" entry={apiEntry.executeResult} />}</Col>
                        </Row>
                    </Container>
                </Collapse>
            </>
        );
    };

    /**
     * Main render
     */
    return (
        <Card className="mb-4" id={apiEntry.name}>
            <Card.Header className="text-white bg-dark">
                {apiEntry.description}&nbsp;({apiEntry.name})
            </Card.Header>
            <Card.Body>
                {renderCardBody()}
                <hr />
                {renderResponse()}
            </Card.Body>
        </Card>
    );
};

export default ApiCard;
