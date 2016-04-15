import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {Snackbar} from 'react-mdl'
import ErrorVM from './ErrorVM'

class ErrorView  extends React.Component{

    static propTypes = {
        error: PropTypes.object
    }

    handleTimeoutSnackbar(){

    }

    render(){
        //par defaut, pour que la snackbar apparaisse lors de la 1ere erreur
        if(!this.props.error)
            return <Snackbar
                        active={false}
                        onTimeout={this.handleTimeoutSnackbar.bind(this)}
                    />;

        const {errorMessage, retryAction} = this.props.error;
        console.log(errorMessage);
        if(!retryAction)
            return <Snackbar
                        active={true}
                        onTimeout={this.handleTimeoutSnackbar.bind(this)}
                        timeout={10000}
                    >{errorMessage}</Snackbar>;

        const {retryAndResetErrorMessage} = this.props;
        return(
            <Snackbar
                active={true}
                onActionClick={retryAndResetErrorMessage}
                timeout={10000}
                action="Retry"
                onTimeout={this.handleTimeoutSnackbar.bind(this)}
                >
    {errorMessage}</Snackbar>
);
    }
}

//inject des propriet�s du store dans les propri�t�s du container
function mapStateToProps(state) {
    return {
        error: state.Error
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        retryAndResetErrorMessage: ErrorVM.retryAndResetErrorMessage
    }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(ErrorView);
//export default connect(mapStateToProps)(ErrorContainer);
