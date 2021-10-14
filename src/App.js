import { useState, useEffect } from 'react';
import './App.css';
import Card from 'components/Card';
import Title from 'components/Title';
import Category from 'components/Category';
import Spinner from 'components/Spinner';
import * as ProjectConstants from 'projectConstants';

function App() {
    const [allApis, setAllApis] = useState(null);

    const readAllApis = () => {
        fetch(ProjectConstants.ALL_APIS_FILE, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
            .then(function (response) {
                if (!response.ok) {
                    throw Error(
                        'Failed to fetch json. Status code: ' + response.status
                    );
                }
                return response.json();
            })
            .then(function (myJson) {
                setAllApis(myJson);
            })
            .catch((error) => {
                console.log('Error encountered. ', error.message);
            });
    };

    useEffect(() => {
        if (allApis === null) {
            readAllApis();
        }
    });

    if (allApis === null) {
        return <Spinner text="Loading..." />;
    }

    return (
        <div className="App">
            <div className="container">
                <Title text="API Test Tool" />
                {allApis.map((e) => (
                    <div key={e.category}>
                        <Category text={e.category} />
                        <div
                            className="accordion"
                            id={`category-${e.category}`}
                        >
                            {e.apis.map((a) => (
                                <Card
                                    key={a.filename}
                                    category={e.category}
                                    apiEntry={{ ...a, success: true }}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
