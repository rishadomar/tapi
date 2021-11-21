import CardList from 'components/CardList';
import Title from 'components/Title';
import ApiProvider from 'context/apisContext';
import React from 'react';
import Container from 'react-bootstrap/Container';
import './App.css';

function App() {
    return (
        <Container className="p-3">
            <Container className="p-5 mb-4 bg-light rounded-3">
                <Title text="API Test Tool" />
                <ApiProvider>
                    <CardList />
                </ApiProvider>
            </Container>
        </Container>
    );
}

export default App;
