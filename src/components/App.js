import React from 'react';
import Config from './config'
import Game from './game'
import PowerButton from './PowerButton'
import PrettyJson from './PrettyJson'

class App extends React.Component{
    constructor(){
        super();
        this.state = {
            config : {},
            last : {},
            next : {}
        };
    }
    componentDidMount(){
        fetch('https://house-hq.com/api/hvac/config')
            .then(results => {
                return results.json();
            }).then(json => {
                this.setState({config:json})
                this.onRefreshLastConfig();
            });
    }
    onPowerButtonClick(action){
        fetch('https://house-hq.com/api/hvac/' + action)
    }
    onRefreshLastConfig(){
        fetch('https://house-hq.com/api/hvac/last')
        .then(results => {
            return results.json();
        }).then(json => {
            this.setState({last:json, next:json})
        });
    }
    onRemoteButtonClick(button, value, me){
        var next = Object.assign({}, me.state.next);
        next[button] = value;
        me.setState({next:next})
        fetch('https://house-hq.com/api/hvac/send', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(next)
        })
        .then(results => {
            me.onRefreshLastConfig();
        });
    }
    render(){
        return (
            <div>
                <center><h2>Remote</h2></center>
                <div className='rowC'>
                    <PowerButton Name='ON' onClick={x => this.onPowerButtonClick('on')} />
                    <PowerButton Name='OFF' onClick={x => this.onPowerButtonClick('off')} />
                </div>
                <Config Data={this.state.config} Last={this.state.last} onClick={(x,y) => this.onRemoteButtonClick(x,y,this)} />
                <center><h2>Config dump</h2></center>
                <PrettyJson json={this.state.config} />
                <center><h2>Last dump</h2></center>
                <PrettyJson json={this.state.last} />
                <center><h2>Next dump</h2></center>
                <PrettyJson json={this.state.next} />
                <center><h2>Tic Tac Toe</h2></center>
                <center><Game /></center>
            </div>
            );
    }
}

export default App; 