import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Store from './pages/Store';
import Product from './pages/Product';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/main.css';

const App = () => {
    return (
        <Router>
            <Header />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/store" component={Store} />
                <Route path="/product/:id" component={Product} />
                <Route path="/dashboard" component={Dashboard} />
            </Switch>
            <Footer />
        </Router>
    );
};

export default App;