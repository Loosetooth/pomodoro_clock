import React from 'react';
import { Component } from 'react';
import Button from 'react-bootstrap/Button';
import {observer} from 'mobx-react';
import {TimeLabel} from '../timelabel/timelabel'
import "./pomodoro.css";

import { CaretDownSquareFill, CaretUpSquareFill, ArrowClockwise, PlayFill, PauseFill } from 'react-bootstrap-icons';


export const Pomodoro = observer(class Pomodoro extends Component {
    constructor(props){
        super(props);
        this.reset = this.reset.bind(this);
        this.incrementBreak = this.incrementBreak.bind(this);
        this.decrementBreak = this.decrementBreak.bind(this);
        this.incrementSession = this.incrementSession.bind(this);
        this.decrementSession = this.decrementSession.bind(this);
        this.startStop = this.startStop.bind(this);
        this.calcTimeLeftMinutesSeconds = this.calcTimeLeftMinutesSeconds.bind(this);
        this.calcTimeLeft = this.calcTimeLeft.bind(this);
        this.countDown = this.countDown.bind(this);
        this.generateTimerLabel = this.generateTimerLabel.bind(this)
        this.buttonVariant = "dark";
    }
    componentDidMount(){
        setInterval(this.countDown, 1000);
    }
    decrementBreak(){
        if(this.props.store.break > 1){
            this.props.store.break -= 1;
        }
    }
    incrementBreak(){
        if(this.props.store.break < 60){
            this.props.store.break += 1;
        }
        
    }
    incrementSession(){
        if(this.props.store.session < 60 ){
            this.props.store.session += 1;
        }
    }
    decrementSession(){
        if(this.props.store.session > 1){
            this.props.store.session -= 1;
        }
    }
    reset() {
        this.props.store.session = 25;
        this.props.store.break = 5;
        this.props.store.isStarted = false;
        this.props.store.isPaused = true;
        this.props.store.isSession = true;
        let alarm = document.getElementById("beep");
        alarm.pause();
        alarm.currentTime = 0;
    }
    startStop() {
        if(!this.props.store.isStarted) {
            this.props.store.isStarted = true;
            this.calcTimeLeft();
        }
        this.props.store.isPaused = !this.props.store.isPaused;
    }
    calcTimeLeft(){
        // Calculate total amount of seconds to count down
        if(this.props.store.isSession){
            this.props.store.timeLeftSeconds = 60 * this.props.store.session;
        } else {
            this.props.store.timeLeftSeconds = 60 * this.props.store.break;
        }
    }
    calcTimeLeftMinutesSeconds(){
        let minutes = 0;
        let seconds = 0;

        if(this.props.store.isStarted){
            minutes = Math.floor(this.props.store.timeLeftSeconds / 60);
            seconds = this.props.store.timeLeftSeconds - minutes * 60;
        } else {
            minutes = this.props.store.session;
        }

        return {
            minutes: minutes,
            seconds: seconds
        };
    }
    countDown(){
        if(this.props.store.isStarted && !this.props.store.isPaused){
            if(this.props.store.timeLeftSeconds > 0){
                this.props.store.timeLeftSeconds -= 1;
            } else {
                // Toggle break/session
                this.props.store.isSession = !this.props.store.isSession;
                this.calcTimeLeft();
                let alarm = document.getElementById("beep");
                alarm.play();
            }
        }
    }
    generateTimerLabel() {
        if(this.props.store.isSession){
            return "Session";
        }else {
            return "Break";
        }
    }
    render() {
        return <div id="pomodoro">
            <h1>Pomodoro Clock</h1>
            <div id="session-break">
                <div id="break">
                    <p id="break-label">Break Length</p>
                    <Button variant={this.buttonVariant} id="break-decrement" onClick={this.decrementBreak}><CaretDownSquareFill /></Button>
                    <TimeLabel id="break-length" minutes={this.props.store.break} seconds={0}></TimeLabel>
                    <Button variant={this.buttonVariant} id="break-increment" onClick={this.incrementBreak}><CaretUpSquareFill /></Button>
                </div>
                <div id="session">
                    <p id="session-label">Session Length</p>
                    <Button variant={this.buttonVariant} id="session-decrement" onClick={this.decrementSession}><CaretDownSquareFill /></Button>
                    <TimeLabel id="session-length" minutes={this.props.store.session} seconds={0}>{this.props.store.session}</TimeLabel>
                    <Button variant={this.buttonVariant} id="session-increment" onClick={this.incrementSession}><CaretUpSquareFill /></Button>
                </div>
            </div>
            <div id="timer-div">
                <div id="timer">
                    <label id="timer-label">{this.generateTimerLabel()}</label>
                    <TimeLabel id="time-left" fontSize="50px" minutes={this.calcTimeLeftMinutesSeconds().minutes} seconds={this.calcTimeLeftMinutesSeconds().seconds}></TimeLabel>
                    <Button variant={this.buttonVariant} id="start_stop" onClick={this.startStop}><PlayFill/><PauseFill/></Button>
                    <Button variant={this.buttonVariant} id="reset" onClick={this.reset}><ArrowClockwise /></Button>
                </div>

            </div>
            <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
        </div>;
    }
});