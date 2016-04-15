import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Button, FABButton, Icon} from 'react-mdl';

import CounterView from '../module_redux/counter/CounterView'
import LoaderView from '../module_redux/loader/LoaderView'
import ErrorView from '../module_redux/error/ErrorView'
//import ErrorContainer from '../containers/error_container'
import * as CounterActions from '../actions/action_creators'
import DevTools from './DevTools';

if (process.env.BROWSER) {
    require('./../asset/main.css');
    require('./../asset/material.min.css');
    require('./../asset/material.min.js');
}

class MainContainer extends React.Component {

    render() {
        const isProduction = process.env.NODE_ENV === 'production';
        const {undo, redo} = this.props;
        return (
            <div>
                <LoaderView/>
                <ErrorView/>
                <Button onClick={undo}>Undo</Button>
                {' '}
                <Button onClick={redo}>Redo</Button>
                <CounterView/>
                <br/>
                <span>{`1 : Production ? ${isProduction}`}</span>
                <br/> {isProduction
                    ? null
                    : <DevTools/>}
            </div>
        );
    }
}

//inject des propriet�s du store dans les propri�t�s du container
function mapStateToProps(state) {
    return {}
}

//inject des actionCreators dans les proprietes du container
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        undo: CounterActions.undo,
        redo: CounterActions.redo
    }, dispatch);
}

//export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
//export default connect(mapStateToProps)(MainContainer);
export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
