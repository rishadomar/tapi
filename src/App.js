import ApiCardList from 'components/ApiCardList';
import Title from 'components/Title';
import ApiProvider from 'context/apisContext';
import React from 'react';
import Container from 'react-bootstrap/Container';
import './App.css';

function App() {
    return (
        <Container fluid className="p-5 bg-light rounded-5">
            <Title text="TAPI - API Testing Tool" />
            <ApiProvider>
                <ApiCardList />
            </ApiProvider>
        </Container>
    );
}

export default App;
