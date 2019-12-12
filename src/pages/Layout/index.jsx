import React, {Suspense, lazy} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

const Login = lazy(() => import('../account/Login/index.jsx'));
const Register = lazy(() => import('../account/Register/index.jsx'));
const Game = lazy(() => import('../game/index.jsx'));

function Layout() {


    return (
        <Router>
            <Suspense fallback={<span>Loading...</span>}>
                <Switch>
                    <Route exact path="/" render={() => (
                        <Redirect to="/login" />
                    )} />
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/game" component={Game}/>
                </Switch>
            </Suspense>

        </Router>
    )
}


export default Layout;
