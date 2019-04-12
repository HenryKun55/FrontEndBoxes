import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Main from './pages/Main';
import Home from './pages/Home';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/box/:id" component={Home} />
        </Switch>
    </BrowserRouter>
)

export default Routes;