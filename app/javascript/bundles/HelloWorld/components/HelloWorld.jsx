import PropTypes from 'prop-types';
import React from 'react';
const UP = 'UP';
const DOWN = 'DOWN';
const LEFT = 'LEFT';
const RIGHT = 'RIGHT';

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

  handlePlayerMovement = (dirObj) => {
      const { top, left } = this.state.positions.player;

      // TODO check walls

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
    return (
      <div className="grid">
        <Player
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
                console.log("key 37 pressed")
                  newDirection = { top: 0, left: -1 , dir: LEFT};
                  break;
              case 38:
                console.log("key 38 pressed")
                  newDirection = { top: -1, left: 0 , dir: UP};
                  break;
              case 39:
                console.log("key 39 pressed")
                  newDirection = { top: 0, left: 1, dir: RIGHT};
                  break;
              case 40:
                console.log("key 40 pressed")
                  newDirection = { top: 1, left: 0, dir: DOWN };
                  break;
              default:
                  return;
          }

          this.props.handlePlayerMovement(newDirection);
      }

  render() {
    return (
      <div
        className="square"
      >
      </div>
    );
  }

  componentDidMount() {
      window.onkeydown = this.handleKeyDown;
  }
}