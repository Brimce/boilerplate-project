import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Counter from '../components/counter_react'
import LoaderReact from '../components/loader_react'
import ErrorContainer from '../containers/error_container'
import * as CounterActions from '../actions/action_creators'
import DevTools from './DevTools';

if ( process.env.BROWSER ) {
    require('./../asset/main.css');
    require('./../asset/material.min.css');    
    require('./../asset/material.min.js');
}

class MainContainer extends React.Component{
    
    render(){     
        const isProduction = process.env.NODE_ENV === 'production';
        
        return (
            <div>
                <LoaderReact isLoading={this.props.isLoading} />
                <Counter counter={this.props.counter}
                         increment={this.props.increment}
                         decrement={this.props.decrement}
                         incrementIfOdd={this.props.incrementIfOdd}
                         incrementAsync={this.props.incrementAsync}
                         undo={this.props.undo}
                         redo={this.props.redo} />
                    {/*isProduction ? null : <DevTools />*/}
                 <ErrorContainer/>   
</div>
        );
    }
}

//inject des propriet�s du store dans les propri�t�s du container
function mapStateToProps(state) {
  return {
      counter: state.CounterReducer.present.count,
      isLoading: state.MainReducer.isLoading,
      error: state.ErrorReducer
  }
}

//inject des actionCreators dans les proprietes du container
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        increment: CounterActions.increment,
        decrement: CounterActions.decrement,
        incrementAsync: CounterActions.incrementAsync,
        incrementIfOdd: CounterActions.incrementIfOdd,
        showLoader: CounterActions.showLoading,
        undo: CounterActions.undo,
        redo: CounterActions.redo
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
//export default connect(mapStateToProps)(MainContainer);
