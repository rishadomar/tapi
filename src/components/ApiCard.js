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
            .catch((error) => {
                setError(error.message);
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
                <Result status={apiEntry.status} error={error}/>
            </>
        );
    };

    /**
     * Render Response section
     * @returns 
     */
    const renderResponse = () => {
        let expectedResponseTitle = "Expected Response";
        if (apiEntry.expectedResponseId) {
            expectedResponseTitle += ` (${apiEntry.expectedResponseId})`
        }

        let actualResponseTitle = "Actual Response";
        if (apiEntry.actualResponseId) {
            actualResponseTitle += ` (${apiEntry.actualResponseId})`
        }

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
                                <Json title={expectedResponseTitle} entry={apiEntry.expectedResponse} />
                            </Col>
                            <Col><Json title={actualResponseTitle} entry={apiEntry.executeResult} /></Col>
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
