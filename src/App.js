import React from 'react';
import './App.css';
import CardList from 'components/CardList';
import Title from 'components/Title';
import ApiProvider from 'context/apisContext';

function App() {
    return (
        <div className="App">
            <div className="container">
                <Title text="API Test Tool" />
                <ApiProvider>
                    <CardList />
                </ApiProvider>
            </div>
        </div>
    );
}

export default App;
