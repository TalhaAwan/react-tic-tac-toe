import React from 'react';
import ReactDOM from 'react-dom';

import '../index.css';
import Square from './square.js';

export default class Board extends React.Component {

  renderSquare(i) {
    return <Square 
    value={this.props.squares[i]} 
    winningSquare = {this.props.winningSquares && this.props.winningSquares.indexOf(i) > -1? true : false}
    onClick={() => this.props.onClick(i)}
    />
  }

  render() {
    const board = [];
    for(let i = 0; i < 3; i++){
      const squareRows = [];
      for(let j = 0; j < 3; j++){
        squareRows.push(this.renderSquare((i*3) + j));
      }
      board.push(<div className="board-row">{squareRows}</div>)
    }

    return (
      <div>
        {board}
      </div>
    );
  }
}