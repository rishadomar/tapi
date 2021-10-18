import React from 'react';
import Result from 'components/Result';
import Json from 'components/Json';
import MethodButton from 'components/MethodButton';
import { ApiContext } from 'context/apisContext';
import { useContext } from 'react';

const Card = ({ category, apiEntry }) => {
    const { executeApi } = useContext(ApiContext);
    const uniqueId = `entry-${apiEntry.id}`;

    return (
        <div className="card p-3">
            <div className="d-flex flex-row justify-content-between">
                <h3 className="align-self-center">
                    {apiEntry.name} &nbsp;
                    {apiEntry.status && <Result success={apiEntry.status} />}
                </h3>

                <button
                    className="btn btn-link text-left"
                    type="button"
                    data-toggle="collapse"
                    data-target={`#${uniqueId}`}
                    aria-expanded="true"
                    aria-controls="collapseOne"
                >
                    Collapse/Show
                </button>

                <MethodButton
                    onClick={() => executeApi(apiEntry)}
                    apiEntry={apiEntry}
                />
            </div>

            <div
                id={uniqueId}
                className="collapse"
                aria-labelledby="headingOne"
                data-parent={`#category-${category}`}
            >
                <div className="card-body">
                    <span>{apiEntry.api}</span>
                    <hr />
                    <Json title="Expected" entry={apiEntry.expectedResponse} />
                    {apiEntry.executeResult && (
                        <Json
                            title="Result JSON"
                            entry={apiEntry.executeResult}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Card;
