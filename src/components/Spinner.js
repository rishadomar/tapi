const Spinner = ({ text }) => {
    return (
        <div className="spinner-border text-primary m-5" role="status">
            <span className="sr-only">{text}</span>
        </div>
    );
};

export default Spinner;
