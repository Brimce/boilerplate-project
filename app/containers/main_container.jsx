import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Counter from '../components/counter_react'
import * as CounterActions from '../actions/action_creators'
import DevTools from './DevTools';

if ( process.env.BROWSER ) {
    require('./../main.css');
}

class MainContainer extends React.Component{
    render(){        
        const isProduction = process.env.NODE_ENV === 'production';

        //return (
        //    <p><strong>Next:</strong>"This is a test"</p>
        //);
        return (
            <div>
                <Counter {...this.props} />
                {isProduction ? null : <DevTools />}                            
            </div>
        );
    }
}

function mapStateToProps(state) {
  return {
    counter: state.counter
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
