import React, { Component, PropTypes } from 'react'
//import Transition from 'react-motion-ui-pack'
//import { Notification } from 'react-notification';
import {Spinner,ProgressBar} from 'react-mdl'
import {AddTransition} from '../lib/style_helper'

class LoaderReact extends React.Component{

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
            //Animate a list of items as they are added
            //<Transition
            //  component={false}
            //  enter={{
            //        //height: 'auto',
            //        opacity: 1
            //  }}
            //  leave={{
            //        //height: 0,
            //        opacity: 0
            //  }}
            //>  
            //    <div key='spinner' style={spinnerStyle}>
            //     <Spinner />
            //    </div>
            //</Transition>


            //<div style={spinnerStyle}>
            // <Spinner />
            //</div>
            //<Notification
            //  isActive={this.props.isLoading}
            //    message={'Loading...'}   
            // />
            //<div>
            //    <ProgressBar indeterminate style={progressBarStyle}/>
            //    <hr style={hrStyle}/>
            //</div>

            <ProgressBar indeterminate style={progressBarStyle}/>
        );
    }
}
export default LoaderReact;