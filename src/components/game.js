import React from 'react';
import ReactDOM from 'react-dom';

import '../index.css';
import Board from './board.js';
import calculateWinner from '../helpers/calculate-winner.js'

export default class Game extends React.Component {
  constructor(){
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
      stepNumber: 0,
      order: "Asc"
    }
  }

  handleClick(i){
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    })
  }

  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    })
  }

  orderChange(){
    this.setState({
      order: this.state.order === "Asc"? "Desc" : "Asc",

    })

  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    let winner;
    let winningSquares = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const description = move? 'Move #' + move: 'Game Start';
      return (
        <li key={move} style={move === this.state.stepNumber? {fontWeight: 600}: null}>
          <a href="#" onClick={() => this.jumpTo(move)}> {description} </a>
        </li>
      );
    })

    let status;
    if(winningSquares){
      winner = current.squares[winningSquares[0]];
      status = 'Winner ' + winner; 
    }
    else{
      status = 'Next player ' + (this.state.xIsNext? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
          squares = {current.squares}
          winningSquares = {winningSquares}
          onClick = {(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{this.state.order === "Asc"? moves : moves.reverse()}</ol>
          <input type="radio" name="gender" value={this.state.order} checked={this.state.order === "Asc"} onChange={() => this.orderChange()} /> Asc<br />
          <input type="radio" name="gender" value={this.state.order} checked={this.state.order === "Desc"} onChange={() => this.orderChange()} /> Desc<br />
        </div>
      </div>
    );
  }
}