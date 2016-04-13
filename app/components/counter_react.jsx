import React, { Component, PropTypes } from 'react'

import {Button , FABButton, Icon } from 'react-mdl';

import {getTodos} from '../actions/action_creators'

class Counter extends Component {

    static propTypes = {
        undo: PropTypes.func.isRequired,
        redo: PropTypes.func.isRequired,
        increment: PropTypes.func.isRequired,
        incrementIfOdd: PropTypes.func.isRequired,
        incrementAsync: PropTypes.func.isRequired,
        decrement: PropTypes.func.isRequired,
        counter: PropTypes.number.isRequired,
    };

    static needs = [
       getTodos
    ];

    static style = {
        margin: 12,
    };

    render() {
        //console.log('props from counter react: ', ...this.props);
        const {
            increment,
            incrementIfOdd,
            incrementAsync,
            decrement,
            counter,
            undo,
            redo
        } = this.props

        return (
            <p>
               Clicked: {counter} times
                {' '}
                <FABButton mini  onClick={increment} style={this.style}>
                    <Icon name="add circle" />
                </FABButton>
                {' '}
                <FABButton mini  onClick={decrement} style={this.style}>
                    <Icon name="remove" />
                </FABButton>
                {' '}
                <Button  onClick={incrementIfOdd}>Increment if odd</Button>
                {' '}
                <Button  onClick={() => incrementAsync()}>Increment async</Button>
                {' '}
                <Button  onClick={undo}>Undo</Button>
                {' '}
                <Button  onClick={redo}>Redo</Button>
          </p>
        );
    }
}

export default Counter
