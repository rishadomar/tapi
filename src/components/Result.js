const Result = ({ success}) => {
    return (
        { success } ?
            <span className="badge badge-success-400 mr-3">Passed</span>
        :
            <span className="badge badge-danger-400 mr-3">Failed</span>
    )
}

export default Result;