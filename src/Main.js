import React from 'react';
import './assets/css/style.css';
import { Route, HashRouter } from "react-router-dom";
import Signin from './pages/Signin/index';
import Dashboard from './pages/Dashboard/index';
import Starships from './pages/Starships/index';
import People from './pages/People/index';
import Vehicles from './pages/Vehicles/index';
import Species from './pages/Species/index';

const Main = () => {

    return(
        <>
            <HashRouter>
                <Route exact path="/" component={Signin} />
                <Route exact path="/signin" component={Signin} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/starships" component={Starships} />
                <Route exact path="/people" component={People} />
                <Route exact path="/vehicles" component={Vehicles} />
                <Route exact path="/species" component={Species} />
            </HashRouter>
        </>
    )

}


export default Main