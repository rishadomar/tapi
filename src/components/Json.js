import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Json = ({ entry }) => {
    return (
        <div className="code-block mt-4">
            <SyntaxHighlighter language="json" style={darcula}>
                {JSON.stringify(entry, null, 4)}
            </SyntaxHighlighter>
        </div>
    );
};

export default Json;
