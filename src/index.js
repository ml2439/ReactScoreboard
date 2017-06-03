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

var nextId = 4;

class AddPlayerForm extends Component {
    constructor() {
        super();

        this.state = {
            name: ""
        };
    }

    onNameChange = (e) => {
        this.setState({
            name: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onAdd(this.state.name);
        this.setState({name: ""});      // Clear input box after adding a player
    }

    render() {
        return (
            <div className="add-player-form">
                <form onSubmit={this.onSubmit}>
                    <input type="text" value={this.state.name} onChange={this.onNameChange} />
                    <input type="submit" value="Add Player" />
                </form>
            </div>
        );
    }
}

AddPlayerForm.propTypes = {
    onAdd: PropTypes.func.isRequired
};

function Stats(props) {
    var totalPlayers = props.players.length;
    var totalPoints = props.players.reduce((total, player) => {
        return total + player.score;
    }, 0);

    return (
        <table className="stats">
            <tbody>
                <tr>
                    <td>Players: </td>
                    <td>{totalPlayers}</td>
                </tr>
                <tr>
                    <td>Total Points: </td>
                    <td>{totalPoints}</td>
                </tr>
            </tbody>
        </table>
    );
}

Stats.propTypes = {
    players: PropTypes.array.isRequired
};

function Header(props) {
    return (
        <div className="header">
            <Stats players={props.players} />
            <h1>{props.title}</h1>
        </div>
    );
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    players: PropTypes.array.isRequired
};

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
            <div className="player-name">
                <a className="remove-player" onClick={props.onRemove}>x</a>
                {props.name}
            </div>
            <div className="player-score">
                <Counter score={props.score} onChange={props.onScoreChange}/>
            </div>
        </div>        
    );
}

Player.propTypes = {
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    onScoreChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired
}

class Application extends Component {
    constructor(props) {
        super();

        this.state = {
            players: props.initialPlayers
        };
    }

    onScoreChange = (index, delta) => {
        this.state.players[index].score += delta;
        this.setState(this.state);      // need to call setState to rerender!
    }

    onPlayerAdd = (name) => {
        this.state.players.push({
            name,
            score: 0,
            id: nextId
        });
        this.setState(this.state);
        nextId += 1;
    }

    onRemovePlayer = (index) => {
        this.state.players.splice(index, 1);
        this.setState(this.state);
    }

    render() {
        return (
            <div className="scoreboard">
                <Header title={this.props.title} players={this.state.players} />
                <div className="players">
                    {this.state.players.map( (p, index) => {
                        return <Player 
                            onScoreChange={(delta) => {this.onScoreChange(index, delta)}}
                            onRemove={() => {this.onRemovePlayer(index)}}
                            name={p.name} 
                            score={p.score} 
                            key={p.id} />
                    })}
                </div>
                <AddPlayerForm onAdd={this.onPlayerAdd}/>
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