import React, { Component, PropTypes } from 'react'
import {Spinner,ProgressBar} from 'react-mdl'
import {AddTransition} from '../../lib/style_helper'
import { connect } from 'react-redux'

class LoaderView extends React.Component{

    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
    }

    render(){
        const displayVar = this.props.isLoading ? 'block' : 'none';
        const spinnerStyle = {
            display: displayVar,
            position:'absolute',
            top:'0px',
            left:'0px',
            padding:'5px',
            background:'black'
        };

        const opacityVar = this.props.isLoading ? 1 : 0;

        //const animation ='opacity 0.5s 0s ease';
        let progressBarStyle = {
            width:'100%',
            opacity: opacityVar
        };

        progressBarStyle = AddTransition(progressBarStyle,'opacity 0.5s 0s ease');

        const displayHrVar = this.props.isLoading ? 'none' : 'block';
        const hrStyle = {
            display: displayHrVar,
            width:'100%',
            border: 0,
            height: '4px',
            //background: '#333',
            padding:0,
            margin:0
            //background-image: 'linear-gradient(to right, #ccc, #333, #ccc)'
        };
        return (
            <ProgressBar indeterminate style={progressBarStyle}/>
        );
    }
}

//inject des propriet�s du store dans les propri�t�s du container
function mapStateToProps(state) {
  return {
      isLoading: state.Loader.isLoading
  }
}

export default connect(mapStateToProps)(LoaderView);
