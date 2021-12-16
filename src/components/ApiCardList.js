import ApiCard from 'components/ApiCard';
import BusySpinner from 'components/BusySpinner';
import { ApiContext } from 'context/apisContext';
import React, { useContext, useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';

const ApiCardList = () => {
    const { apis, readApis } = useContext(ApiContext);
    const [toastMessage, setToastMessage] = useState(null);

    useEffect(() => {
        if (apis === null && toastMessage === null) {
            readApis().catch((error) => {
                setToastMessage({ header: 'Error encountered', text: error });
            });
        }
    });

    if (toastMessage) {
        return <Alert variant={'info'}>{toastMessage.text}</Alert>;
    }

    if (apis === null) {
        return <BusySpinner text="Loading..." />;
    }

    const renderSection = (folder) => (
        <Accordion className="my-3" key={folder.name} defaultActiveKey={folder.name}>
            <Accordion.Item eventKey={folder.name} />
            <Accordion.Header data-name={folder.name}>{folder.name}</Accordion.Header>
            <Accordion.Body>
                {folder.entries.map((a) => a.type === 'File' && <ApiCard key={a.id} category={folder.name} apiEntry={{ ...a }} />)}
            </Accordion.Body>
        </Accordion>
    );

    return apis.content.entries.map((folder) => {
        if (folder.type === 'Folder' && folder.entries.length > 0) {
            return renderSection(folder);
        }
    });
};

export default ApiCardList;
