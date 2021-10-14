import Result from 'components/Result';

const Card = ({ category, apiEntry }) => {
    const uniqueId = `entry-${category}-${apiEntry.name.replace('.', '-')}`;

    return (
        <div className="card p-3 d-flex flex-row justify-content-between">
            <h3 className="align-self-center">
                {apiEntry.name} &nbsp;
                <Result success={apiEntry.result} />
            </h3>

            <button
                className="btn btn-link btn-block text-left"
                type="button"
                data-toggle="collapse"
                data-target={`#${uniqueId}`}
                aria-expanded="true"
                aria-controls="collapseOne"
            >
                Collapse/Show
            </button>

            <button type="button" className="btn btn-primary">
                {apiEntry.method}
            </button>

            <div
                id={uniqueId}
                className="collapse"
                aria-labelledby="headingOne"
                data-parent={`#category-${category}`}
            >
                <div className="card-body">
                    Anim pariatur cliche reprehenderit, enim eiusmod high life
                    accusamus terry richardson ad squid. 3 wolf moon officia
                    aute, non cupidatat skateboard dolor brunch. Food truck
                    quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor,
                    sunt aliqua put a bird on it squid single-origin coffee
                    nulla assumenda shoreditch et. Nihil anim keffiyeh
                    helvetica, craft beer labore wes anderson cred nesciunt
                    sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                    Leggings occaecat craft beer farm-to-table, raw denim
                    aesthetic synth nesciunt you probably haven't heard of them
                    accusamus labore sustainable VHS.
                </div>
            </div>
        </div>
    );
};

export default Card;
