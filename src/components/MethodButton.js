const MethodButton = ({ apiEntry, onClick }) => {
    return (
        <button
            onClick={() => onClick(apiEntry)}
            type="button"
            className="btn btn-primary"
        >
            {apiEntry.method}
        </button>
    );
};

export default MethodButton;
