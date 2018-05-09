import React from 'react';
import ReactDOM from 'react-dom';
// import { browserHistory } from 'react-router';
import { Switch } from "react-router-dom";
// import { createBrowserHistory } from 'history'
import { Router, IndexRedirect, Route, browserHistory } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

import styles from '../styles/styles.styl';

import Stocks from '../screens/Stocks/Stocks';
import RightMenu from '../screens/RightMenu';

import { Characters } from '../screens/Characters';
import FirebaseDatabase from '../screens/FirebaseDatabase';
import HocInputFields from '../screens/HocInputFields';
import FirebaseFirestore from '../screens/FirebaseFirestore';
import FormInput from '../screens/FormInput';

import NotFound from '../screens/NotFound';
import firebase from 'firebase';

import linkList from '../constants/LinkList';
const appConstants = require('../constants/appConstants');

import createHistory from 'history/createBrowserHistory';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux
class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <React.Fragment>
                <ConnectedRouter history={history}>
                    <React.Fragment>
                        <h1 className={styles.heading}>{appConstants.APP_NAME}</h1>
                        <div>
                            <div className="container-over-boxes">
                                <div className="align-left left-side-width">
                                    <div className="left-main main">
                                        <RightMenu></RightMenu>
                                    </div>
                                </div>
                                <div className="right-main main right-side-width">
                                    <Switch>
                                        <Route exact path="/" component={Stocks} />
                                        <Route path={'/characters'} component={Characters} />
                                        <Route path={'/firebasedatabase'} component={FirebaseDatabase} />
                                        <Route path={'/hocinputfields'} component={HocInputFields} />
                                        <Route path={'/firebasefirestore'} component={FirebaseFirestore} />
                                        <Route path={'/forminput'} component={FormInput} />
                                        {/* <Route path='*' component={NotFound} /> */}
                                        <Route component={NotFound} />
                                    </Switch>
                                </div>
                            </div>
                        </div>
                    </React.Fragment >
                </ConnectedRouter >
            </React.Fragment >
        )
    }
}

export default Main;
