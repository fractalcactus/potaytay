import PropTypes from 'prop-types';
import React from 'react';
import Popup from "reactjs-popup";


const UP = 'UP';
const DOWN = 'DOWN';
const LEFT = 'LEFT';
const RIGHT = 'RIGHT';
const GRID_SIZE = 30

//TODO MEMORIES should be loaded in from the rails db
const MEMORIES = [{ top: 3, left: 3, text: "hello there : )"}, { top: 3, left: 5, text: "wooo : )"}]


// the default state, calculated when HelloWorld is called
const getDefaultState = () => {
    return {
        positions: {
            player: {
                top: 1,
                left: 1
            },
        },
    }
};


export default class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
    this.state = getDefaultState()
  }

  checkIfTileContainsMemory = (newDirection) => {
    let newDirTop = newDirection.top
    let newDirLeft = newDirection.left
    let memoryTriggerStyles = {
      position: 'absolute',
      top: ((newDirTop * GRID_SIZE) - 16) + 'px',
      left: (newDirLeft * GRID_SIZE) + 'px'
    }


    //if newDirection's top and left match any of the objects in MEMORY
    let memoriesLength = MEMORIES.length;
    for (var i = 0; i < memoriesLength; i++){
      if(MEMORIES[i].top == newDirTop && MEMORIES[i].left == newDirLeft){
        console.log('------memory!-------')
        // return markup for memory popup
         let memoryMarkup = <Popup trigger={<button style={memoryTriggerStyles} className="memoryTrigger"> memory!</button>} modal> <div>Popup content here, will be generated from memory, e.g text is { MEMORIES[i].text }</div></Popup>
         return memoryMarkup
      }
    }
  }

  handlePlayerMovement = (dirObj) => {
      const { top, left } = this.state.positions.player;

      // TODO check walls

      // if you can move, update the position, and then check if your new position contains a memory

      this.setState({
          positions: {
              ...this.state.positions,
              player: {
                  top: top + (1 * dirObj.top),
                  left: left + (1 * dirObj.left)
              }
          }
      });

      console.log("player top is now " + this.state.positions.player.top)
      console.log("player left is now " + this.state.positions.player.left)
  }



  render() {
    let potentialMemory = this.checkIfTileContainsMemory({top: this.state.positions.player.top, left: this.state.positions.player.left})
    return (
      <div className="grid">
        { potentialMemory }
        <Player
            position={this.state.positions.player}
            handlePlayerMovement={this.handlePlayerMovement} />
      </div>
    );
  }
}

// presentational component
class Player extends React.Component {
// on a key down, console log

  handleKeyDown = (e) => {
          let newDirection;
          switch(e.keyCode) {
              case 37:
                  newDirection = { top: 0, left: -1 , dir: LEFT};
                  break;
              case 38:
                  newDirection = { top: -1, left: 0 , dir: UP};
                  break;
              case 39:
                  newDirection = { top: 0, left: 1, dir: RIGHT};
                  break;
              case 40:
                  newDirection = { top: 1, left: 0, dir: DOWN };
                  break;
              default:
                  return;
          }
 
          this.props.handlePlayerMovement(newDirection);
      }



  render() {
    const { size, position: { top, left }} = this.props;
    let squareStyle = {
      top: (top * GRID_SIZE) + 'px',
      left: (left * GRID_SIZE) + 'px'
    }
    return (
      <div
        className="square"
        style={squareStyle}
      >
      </div>
    );
  }

  componentDidMount() {
      window.onkeydown = this.handleKeyDown;
  }
}