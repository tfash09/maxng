import React from 'react';
import './assets/css/style.css';
import { Route, HashRouter } from "react-router-dom";
import Signin from './pages/Signin/index';
import Dashboard from './pages/Dashboard/index';

const Main = () => {

    return(
        <>
            <HashRouter>
                <Route exact path="/" component={Signin} />
                <Route exact path="/signin" component={Signin} />
                <Route exact path="/dashboard" component={Dashboard} />
            </HashRouter>
        </>
    )

}


export default Main