import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { duotoneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Json = ({ title, entry }) => {
    return (
        <>
            {title && <div className="text-secondary">{title}</div>}
            {entry ? (
                <SyntaxHighlighter language="json" style={duotoneLight}>
                    {JSON.stringify(entry, null, 4)}
                </SyntaxHighlighter>
            ) : (
                <div>No response data</div>
            )}
        </>
    );
};

export default Json;
