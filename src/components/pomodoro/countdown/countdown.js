import React from 'react';
import { Component } from 'react';
import {TimeLabel} from '../timelabel/timelabel'

export default class CountDown extends Component {
    constructor(props){
        super(props);

    }
    render(){
        <TimeLabel id="time-left" minutes={0} seconds={0}>mm:ss</TimeLabel>
        
    }
}