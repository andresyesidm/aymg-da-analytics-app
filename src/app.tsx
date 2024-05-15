import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {OrUploadFile} from "./components/organism/or-upload-file/or-upload-file";
import {HashRouter, Route, Switch} from "react-router-dom";
import {OrDashboard} from "./components/organism/or-dashboard/or-dashboard";
import {OrFullview} from "./components/organism/or-fullview/or-fullview";

const App = () => {
    return (
        <Fragment>
            <HashRouter>
                <Switch>
                    <Route exact path='/' component={OrUploadFile}/>
                    <Route exact path='/dashboard' component={OrDashboard}/>
                    <Route exact path='/fullView' component={OrFullview} />
                </Switch>
            </HashRouter>
        </Fragment>
    )
}

ReactDOM.render(<App/>, document.querySelector('#root'))

//comment
