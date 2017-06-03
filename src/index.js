import React, { Component } from 'react';
import { render } from 'react-dom';
import { PropTypes } from 'prop-types';
import './stylesheets/app.css';

const PLAYERS = [
    {
        name: "John Doe",
        score: 31,
        id: 1
    },
    {
        name: "James",
        score: 34,
        id: 2
    },
    {
        name: "Jessie",
        score: 40,
        id: 3
    }
];

function Header(props) {
    return (
        <div className="header">
            <h1>{props.title}</h1>
        </div>
    );
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

/*
class Counter extends Component {
    constructor(props) {
        super();
        
        this.state = {
            score: props.initialScore       // Don't forget to pass props parameter to constructor. Otherwise TypeError
        }

        // Without this bind, the incrementScore won't work and get Uncaught TypeError: Cannot read property 'setState' of undefined
        // checkout this link: https://hahvahd15mengqiao.wordpress.com/2017/06/02/react-binding-issue/
        this.incrementScore = this.incrementScore.bind(this);
    }

    incrementScore() {
        this.setState({
            score: (this.state.score + 1)
        });
    }
    // Because of this arrow function, no need to bind this in the constructor.
    decrementScore = () => {
        this.setState({
            score: (this.state.score - 1)
        });
    }

    render() {
        return (
            <div className="counter">
                <button className="counter-action decrement" onClick={this.decrementScore}> - </button>
                <div className="counter-score">{this.state.score}</div>
                <button className="counter-action increment" onClick={this.incrementScore}> + </button>
            </div>           
        );
    }
}

Counter.propTypes = {
    initialScore: PropTypes.number.isRequired
};
*/

function Counter(props) {
    return (
        <div className="counter">
            <button className="counter-action decrement" onClick={function() {props.onChange(-1)}}> - </button>
            <div className="counter-score">{props.score}</div>
            <button className="counter-action increment" onClick={function() {props.onChange(1)}}> + </button>
        </div>           
    );
}

Counter.propTypes = {
    score: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
}

function Player(props) {
    return (
        <div className="player">
            <div className="player-name">{props.name}</div>
            <div className="player-score">
                <Counter score={props.score} onChange={props.onScoreChange}/>
            </div>
        </div>        
    );
}

Player.propTypes = {
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    onScoreChange: PropTypes.func.isRequired
}

class Application extends Component {
    constructor(props) {
        super();

        this.state = {
            players: props.initialPlayers
        };
    }

    onScoreChange = (index, delta) => {
        console.log('onScoreChange', index, delta);
        this.state.players[index].score += delta;
        this.setState(this.state);      // need to call setState to rerender!
    }

    render() {
        return (
            <div className="scoreboard">
                <Header title={this.props.title}/>
                <div className="players">
                    {this.state.players.map( (p, index) => {
                        return <Player 
                            onScoreChange={(delta) => {this.onScoreChange(index, delta)}}
                            name={p.name} 
                            score={p.score} 
                            key={p.id} />
                    })}
                </div>
            </div>
        );
    }
}

Application.propTypes = {
    title: PropTypes.string,
    initialPlayers: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired
    })).isRequired
};

Application.defaultProps = {
    title: "Scoreboard"
}

render(
    <Application initialPlayers={PLAYERS}/>,
    document.getElementById('react-container')
);