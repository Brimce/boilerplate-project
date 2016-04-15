import React, { Component, PropTypes } from 'react'
import {Button , FABButton, Icon } from 'react-mdl';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CounterVM from './CounterVM'

class CounterView extends Component {

    static propTypes = {
        increment: PropTypes.func.isRequired,
        incrementIfOdd: PropTypes.func.isRequired,
        incrementAsync: PropTypes.func.isRequired,
        decrement: PropTypes.func.isRequired,
        counter: PropTypes.number.isRequired,
    };

    /*static needs = [
       getTodos
    ];*/

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
            //undo,
            //redo
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
                <Button  onClick={() => incrementAsync()}>Increment async ! </Button>

          </p>
        );
    }
}

//inject des propriet�s du store dans les propri�t�s du container
function mapStateToProps(state) {
  return {
      counter: state.Counter.count
  }
}

//inject des actionCreators dans les proprietes du container
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        increment: CounterVM.increment,
        decrement: CounterVM.decrement,
        incrementAsync: CounterVM.incrementAsync,
        incrementIfOdd: CounterVM.incrementIfOdd,
        showLoader: CounterVM.showLoading,
        //undo: CounterVM.undo,
        //redo: CounterVM.redo
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CounterView)
