import React from 'react';
import Category from 'components/Category';
import Card from 'components/Card';
import Spinner from 'components/Spinner';
import { ApiContext } from 'context/apisContext';
import { useContext, useEffect, useState } from 'react';

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
            setCategoriesWithApis(breakApiEntriesIntoCategories(apis));
        }
    }, [apis]);

    if (apis === null) {
        return <Spinner text="Loading..." />;
    }

    const breakApiEntriesIntoCategories = (apis) => {
        let categories = [];
        apis.forEach((apiEntry) => {
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
        <div key={c.category}>
            <Category text={c.category} />
            <div className="accordion" id={`category-${c.category}`}>
                {c.apiEntries.map((a) => (
                    <Card
                        key={a.id}
                        category={c.category}
                        apiEntry={{ ...a }}
                    />
                ))}
            </div>
        </div>
    ));
};

export default CardList;
