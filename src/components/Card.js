import Result from 'components/Result';
import Json from 'components/Json';
import MethodButton from 'components/MethodButton';

const Card = ({ category, apiEntry }) => {
    const uniqueId = `entry-${category}-${apiEntry.name.replace('.', '-')}`;

    const executeApi = (apiEntry) => {
        console.log('Do the stuff');
    };

    return (
        <div className="card p-3">
            <div className="d-flex flex-row justify-content-between">
                <h3 className="align-self-center">
                    {apiEntry.name} &nbsp;
                    <Result success={apiEntry.result} />
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

                <MethodButton onClick={executeApi} apiEntry={apiEntry} />
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
                </div>
            </div>
        </div>
    );
};

export default Card;
