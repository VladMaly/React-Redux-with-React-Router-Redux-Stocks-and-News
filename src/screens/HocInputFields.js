import React, { Component } from 'react';
import { Route } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function InputField(defaultInput, customClickEvent = null) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                startingInput: defaultInput
            };
        }

        updateField(e) {
            this.setState({
                startingInput: e.target.value
            });
        }

        clickEvent(e) {
            if (customClickEvent == null) {
                this.setState({
                    startingInput: e.target.value + 'Extra'
                });
            } else {
                console.log(customClickEvent(e.target.value));
                this.setState({
                    startingInput: customClickEvent(e.target.value)
                });
            }
        }

        render() {
            return (
                <React.Fragment>
                    <input
                        type="text"
                        value={this.state.startingInput}
                        onChange={this.updateField.bind(this)}
                        onClick={this.clickEvent.bind(this)}
                    />
                </React.Fragment>
            );
        }
    }
}

function CustomClickEvent1(currText) {
    return currText + 'CustomExtra';
}

const FieldHOC = InputField('Carl Van Loon', CustomClickEvent1);
const FieldHOC2 = InputField('Limitless');
const FieldHOC3 = InputField('Call Me Ishmael', (currText) => ('Moby Dick'));

class HocInputFields extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        // console.log(this.props);
        // Rest Operator
        // let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
        // console.log(x); // 1
        // console.log(y); // 2
        // console.log(z); // { a: 3, b: 4 }

        // Spread Operator
        // let n = { x, y, ...z };
        // console.log(n); // { x: 1, y: 2, a: 3, b: 4 }
    }
    render() {
        return (
            <React.Fragment>
                <h3>
                    The InputHOC intends to show HOC(Higher Order Components)
                        in comparison to the link above. Added custom click events to two
                        of the input fields referenced from outside the class.
                </h3>
                <FieldHOC />
                <FieldHOC2 />
                <FieldHOC3 />
                <div> Counter: {this.props.counter}</div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        state: state,
        counter: state.counter.number,
    }
}

export default connect(mapStateToProps)(HocInputFields);
// export default HocInputFields;
