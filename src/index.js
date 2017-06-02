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

class Counter extends Component {
    render() {
        return (
            <div className="counter">
                <button className="counter-action decrement"> - </button>
                <div className="counter-score">{this.props.score}</div>
                <button className="counter-action increment"> + </button>
            </div>           
        );
    }
}

Counter.propTypes = {
    score: PropTypes.number.isRequired
}

function Player(props) {
    return (
        <div className="player">
            <div className="player-name">{props.name}</div>
            <div className="player-score">
                <Counter score={props.score} />
            </div>
        </div>        
    );
}

Player.propTypes = {
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired
}

function Application (props) {
    return (
        <div className="scoreboard">
            <Header title={props.title}/>
            <div className="players">
                {props.players.map( p => {
                    return <Player name={p.name} score={p.score} key={p.id} />
                })}
            </div>

        </div>
    );
}

Application.propTypes = {
    title: PropTypes.string,
    players: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired
    })).isRequired
};

Application.defaultProps = {
    title: "Scoreboard"
}

render(
    <Application players={PLAYERS}/>,
    document.getElementById('react-container')
);