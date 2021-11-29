import ApiCard from 'components/ApiCard';
import BusySpinner from 'components/BusySpinner';
import { ApiContext } from 'context/apisContext';
import React, { useContext, useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';

const CardList = () => {
    const { apis, readApis } = useContext(ApiContext);
    const [categoriesWithApis, setCategoriesWithApis] = useState([]);

    useEffect(() => {
        if (apis === null) {
            readApis();
        }
    });

    useEffect(() => {
        if (apis !== null) {
            setCategoriesWithApis(breakApiEntriesIntoCategories(apis.entries));
        }
    }, [apis]);

    if (apis === null) {
        return <BusySpinner text="Loading..." />;
    }

    const breakApiEntriesIntoCategories = (apiEntries) => {
        let categories = [];
        apiEntries.forEach((apiEntry) => {
            const foundCategoryEntry = categories.find(
                (c) => c.category === apiEntry.category
            );
            if (foundCategoryEntry == null) {
                categories.push({
                    category: apiEntry.category,
                    apiEntries: [apiEntry],
                });
            } else {
                foundCategoryEntry.apiEntries.push(apiEntry);
            }
        });
        return categories;
    };

    return categoriesWithApis.map((c) => (
        <Accordion key={c.category} defaultActiveKey={c.category}>
            <Accordion.Item eventKey={c.category} />
            <Accordion.Header data-name={c.category}>{c.category}</Accordion.Header>
            <Accordion.Body>
                {c.apiEntries.map((a) => (
                    <ApiCard
                        key={a.id}
                        category={c.category}
                        apiEntry={{ ...a }}
                    />
                ))}
            </Accordion.Body>
        </Accordion>
    ));
};

export default CardList;
