import React from 'react';
import { Component } from 'react';
import Button from 'react-bootstrap/Button';

export class TimeLabel extends Component {
    constructor(props){
        super(props);
        this.visualizeMinutes = this.visualizeMinutes.bind(this);
        this.visualizeSeconds = this.visualizeSeconds.bind(this);
        this.fontSize = this.props.fontSize ? this.props.fontSize : "30px";
    }
    visualizeNumber(number){
        if(number>=10){
            return number.toString();
        } else {
            return "0" + number.toString();
        }
    }
    visualizeMinutes(){
        return this.visualizeNumber(this.props.minutes);
    }
    visualizeSeconds(){
        return this.visualizeNumber(this.props.seconds);
    }
    render(){
        return <label style={{fontFamily: 'digital-clock-font', fontSize: this.fontSize}}>{this.visualizeMinutes()}:{this.visualizeSeconds()}</label>
    }
}