import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import linkList from '../constants/LinkList';
const appConstants = require('../constants/appConstants');
import { Link } from "react-router-dom";

class RightMenu extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <React.Fragment>
                <div>
                    {linkList.map((link) =>
                        <Link to={link.linkTo} key={link.id}>
                            <h3>{link.linkName}</h3>
                        </Link>
                    )}
                </div>
            </React.Fragment >
        );
    }
}

export default RightMenu;
