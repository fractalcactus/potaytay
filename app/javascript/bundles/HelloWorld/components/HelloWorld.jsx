import PropTypes from 'prop-types';
import React from 'react';
import Popup from "reactjs-popup";


const UP = 'UP';
const DOWN = 'DOWN';
const LEFT = 'LEFT';
const RIGHT = 'RIGHT';
const GRID_SIZE = 15;

// the default state, calculated when HelloWorld is called
const getDefaultState = () => {
    return {
        positions: {
            player: {
                top: 22,
                left: 30
            },
        },
        flatmates:{
          jasper:   { name: 'jasper',    top: 8,     left: 59,    image: "https://i.imgur.com/B9w7jhc.png",     key: 'jasper',    is_interactable: false },

          brigette: { name:'brigette',   top: 47,    left: 49,   image: "https://i.imgur.com/ePWiKmh.png",     key: 'brigette',  is_interactable: false },

          andrew:   { name:'andrew',     top: 23,    left: 49,   image: "https://i.imgur.com/3ykYlN2.png",     key: 'andrew',    is_interactable: false },

          louise:   { name:'louise',     top: 32,    left: 52,   image: "https://i.imgur.com/gEUwP4f.png",     key: 'louise',    is_interactable: false },

          thijs:    { name:'thijs',      top: 47,    left: 68,      image: "https://i.imgur.com/fwhaKmM.png",     key: 'thijs',     is_interactable: false},

          daniel:   { name:'daniel',     top: 47,    left: 34,      image: "https://i.imgur.com/rqAyeJT.png",     key: 'daniel',    is_interactable: false},

          gabby:    { name:'gabby',      top: 22,    left: 22,      image: "https://i.imgur.com/5rt2Fyr.png",     key: 'gabby', is_interactable: false},

          rose:     { name:'rose',       top: 8,     left: 34,       image: "https://i.imgur.com/PfqKuA1.png",     key: 'rose',      is_interactable: false},

          eden:     { name:'eden',       top: 23,    left: 66,      image: "https://i.imgur.com/9FXBg6X.png",     key: 'eden',      is_interactable: false},

          ollie:    { name:'ollie',      top: 33,    left: 12,      image: "https://i.imgur.com/kh36ArR.png",     key: 'ollie',     is_interactable: false},

          harry:    { name:'harry',      top: 33,    left: 32,      image: "https://i.imgur.com/9URuSPO.png",     key: 'harry',     is_interactable: false},

          bella:    { name:'bella',      top: 31,    left: 43,      image: "https://i.imgur.com/F8J2aUp.png",     key: 'bella',     is_interactable: false},

          will:    { name:'will',        top: 19, left: 27,      image: "https://i.imgur.com/w0rtFoG.png",     key: 'will',     is_interactable: false},

          india:   { name:'india',      top: 33, left: 38,      image: "https://i.imgur.com/54eSnTc.png",     key: 'india',     is_interactable: false},

          anna:    { name:'anna',        top: 49, left: 13,      image: "https://i.imgur.com/1JCqM9k.png",     key: 'anna',     is_interactable: false},
        }
    }
};


export default class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
    this.state = getDefaultState()
  }

  checkIfTileContainsMemory = (newDirection) => {
    let memories = this.props.memory_array
    let quotes = this.props.quotes
    let newDirTop = newDirection.top
    let newDirLeft = newDirection.left
    let memoryTriggerStyles = {
      position: 'absolute',
      top: ((newDirTop * GRID_SIZE) - 16) + 'px',
      left: ((newDirLeft * GRID_SIZE) - 16) + 'px'
    }
    // check memories
    let contentStyles = {
      backgroundColour: "red"
    }
    
    let memoriesLength = memories.length;
    for (var i = 0; i < memoriesLength; i++){
      if(memories[i].top == String(newDirTop) && memories[i].left == String(newDirLeft)){
         let memoryMarkup = <Popup className='memory-popup' trigger={<button style={memoryTriggerStyles} className="memoryTrigger"> memory!</button>} modal> <div className='memory-box'><img className='memory-image' src={ memories[i].image }/><p><span>{ memories[i].text }</span></p></div></Popup>
         return memoryMarkup
      }
    }
  }

  handlePlayerMovement = (dirObj) => {
      const { top, left } = this.state.positions.player;


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
      let newDirTop = this.state.positions.player.top
      let newDirLeft = this.state.positions.player.left
      //check flatmates
      for (var f in this.state.flatmates){
        let flatmateObj = this.state.flatmates[f]
        let flatmateTop = flatmateObj.top
        let flatmateLeft = flatmateObj.left
        let flatmateKey = flatmateObj.key
        if(flatmateTop == newDirTop && flatmateLeft == (newDirLeft - 2)){
          //update is_interactable state to true for that flatmate
          if(flatmateKey == 'jasper'){
            this.setState({
                  flatmates: {
                    ...this.state.flatmates,
                    jasper: {
                      ...this.state.flatmates.jasper,
                        is_interactable: true
                    }
                }
            });
          } else if(flatmateKey == 'brigette'){
            this.setState({
                flatmates: {
                    ...this.state.flatmates,
                    brigette: {
                      ...this.state.flatmates.brigette,
                        is_interactable: true
                    }
                }
            });
          } else if(flatmateKey == 'andrew'){
            this.setState({
                flatmates: {
                    ...this.state.flatmates,
                    andrew: {
                      ...this.state.flatmates.andrew,
                        is_interactable: true
                    }
                }
            });
          } else if(flatmateKey == 'louise'){
            this.setState({
                flatmates: {
                    ...this.state.flatmates,
                    louise: {
                      ...this.state.flatmates.louise,
                        is_interactable: true
                    }
                }
            });
          } else if(flatmateKey == 'thijs'){
            this.setState({
                flatmates: {
                    ...this.state.flatmates,
                    thijs: {
                      ...this.state.flatmates.thijs,
                        is_interactable: true
                    }
                }
            });
          } else if(flatmateKey == 'daniel'){
            this.setState({
                flatmates: {
                    ...this.state.flatmates,
                    daniel: {
                      ...this.state.flatmates.daniel,
                        is_interactable: true
                    }
                }
            });
          } else if(flatmateKey == 'rose'){
            this.setState({
                flatmates: {
                    ...this.state.flatmates,
                    rose: {
                      ...this.state.flatmates.rose,
                        is_interactable: true
                    }
                }
            });
          } else if(flatmateKey == 'gabby'){
            this.setState({
                flatmates: {
                    ...this.state.flatmates,
                    gabby: {
                      ...this.state.flatmates.gabby,
                        is_interactable: true
                    }
                }
            });
          } else if(flatmateKey == 'bella'){
            this.setState({
                flatmates: {
                    ...this.state.flatmates,
                    bella: {
                      ...this.state.flatmates.bella,
                        is_interactable: true
                    }
                }
            });
          } else if(flatmateKey == 'ollie'){
            this.setState({
                flatmates: {
                    ...this.state.flatmates,
                    ollie: {
                      ...this.state.flatmates.ollie,
                        is_interactable: true
                    }
                }
            });
          } else if(flatmateKey == 'harry'){
            this.setState({
                flatmates: {
                    ...this.state.flatmates,
                    harry: {
                      ...this.state.flatmates.harry,
                        is_interactable: true
                    }
                }
            });
          } else if(flatmateKey == 'eden'){
            this.setState({
                flatmates: {
                    ...this.state.flatmates,
                    eden: {
                      ...this.state.flatmates.eden,
                        is_interactable: true
                    }
                }
            });
          } else if(flatmateKey == 'will'){
            this.setState({
                flatmates: {
                    ...this.state.flatmates,
                    will: {
                      ...this.state.flatmates.will,
                        is_interactable: true
                    }
                }
            });
          } else if(flatmateKey == 'india'){
            this.setState({
                flatmates: {
                    ...this.state.flatmates,
                    india: {
                      ...this.state.flatmates.india,
                        is_interactable: true
                    }
                }
            });
          } else if(flatmateKey == 'anna'){
            this.setState({
                flatmates: {
                    ...this.state.flatmates,
                    anna: {
                      ...this.state.flatmates.anna,
                        is_interactable: true
                    }
                }
            });
          }
        }else{
          //update is_interactable state to false for that flatmate
     if(flatmateKey == 'jasper'){
            this.setState({
                  flatmates: {
                    ...this.state.flatmates,
                    jasper: {
                      ...this.state.flatmates.jasper,
                        is_interactable: false
                    }
                }
            });
          } else if(flatmateKey == 'brigette'){
            this.setState({
                flatmates: {
                    ...this.state.flatmates,
                    brigette: {
                      ...this.state.flatmates.brigette,
                        is_interactable: false
                    }
                }
            });
          } else if(flatmateKey == 'andrew'){
            this.setState({
                flatmates: {
                    ...this.state.flatmates,
                    andrew: {
                      ...this.state.flatmates.andrew,
                        is_interactable: false
                    }
                }
            });
          } else if(flatmateKey == 'louise'){
            this.setState({
                flatmates: {
                    ...this.state.flatmates,
                    louise: {
                      ...this.state.flatmates.louise,
                        is_interactable: false
                    }
                }
            });
          } else if(flatmateKey == 'thijs'){
            this.setState({
                flatmates: {
                    ...this.state.flatmates,
                    thijs: {
                      ...this.state.flatmates.thijs,
                        is_interactable: false
                    }
                }
            });
          } else if(flatmateKey == 'daniel'){
            this.setState({
                flatmates: {
                    ...this.state.flatmates,
                    daniel: {
                      ...this.state.flatmates.daniel,
                        is_interactable: false
                    }
                }
            });
          } else if(flatmateKey == 'rose'){
            this.setState({
                flatmates: {
                    ...this.state.flatmates,
                    rose: {
                      ...this.state.flatmates.rose,
                        is_interactable: false
                    }
                }
            });
          } else if(flatmateKey == 'gabby'){
            this.setState({
                flatmates: {
                    ...this.state.flatmates,
                    gabby: {
                      ...this.state.flatmates.gabby,
                        is_interactable: false
                    }
                }
            });
          } else if(flatmateKey == 'bella'){
            this.setState({
                flatmates: {
                    ...this.state.flatmates,
                    bella: {
                      ...this.state.flatmates.bella,
                        is_interactable: false
                    }
                }
            });
          } else if(flatmateKey == 'ollie'){
            this.setState({
                flatmates: {
                    ...this.state.flatmates,
                    ollie: {
                      ...this.state.flatmates.ollie,
                        is_interactable: false
                    }
                }
            });
          } else if(flatmateKey == 'harry'){
            this.setState({
                flatmates: {
                    ...this.state.flatmates,
                    harry: {
                      ...this.state.flatmates.harry,
                        is_interactable: false
                    }
                }
            });
          } else if(flatmateKey == 'eden'){
            this.setState({
                flatmates: {
                    ...this.state.flatmates,
                    eden: {
                      ...this.state.flatmates.eden,
                        is_interactable: false
                    }
                }
            });
          } else if(flatmateKey == 'will'){
            this.setState({
                flatmates: {
                    ...this.state.flatmates,
                    will: {
                      ...this.state.flatmates.will,
                        is_interactable: false
                    }
                }
            });
          } else if(flatmateKey == 'india'){
            this.setState({
                flatmates: {
                    ...this.state.flatmates,
                    india: {
                      ...this.state.flatmates.india,
                        is_interactable: false
                    }
                }
            });
          } else if(flatmateKey == 'anna'){
            this.setState({
                flatmates: {
                    ...this.state.flatmates,
                    anna: {
                      ...this.state.flatmates.anna,
                        is_interactable: false
                    }
                }
            });
          }

        }
      }

      console.log("Memory.create(top: " + this.state.positions.player.top + ", left: " + this.state.positions.player.left + ",")
      console.log("------------")
  }

  renderFlatmates = () => {
    let flatmates = Object.assign({}, this.state.flatmates)
    let flatmatesArr = Object.values(flatmates)
    let newFlatmatesArr = flatmatesArr.map(f => this.generateAFlatmate(f,this.props.quotes));
    console.log(newFlatmatesArr);
    return newFlatmatesArr //this is a local object, not the state
  }

  generateAFlatmate = (flatmateObj,quotes) => {
    return <Flatmate quotes={quotes[flatmateObj.name]} name={flatmateObj.name} is_interactable={flatmateObj.is_interactable} top={flatmateObj.top}   left={flatmateObj.left}   image={flatmateObj.image}   key={flatmateObj.key} />
  }

  render() {

    let potentialMemory = this.checkIfTileContainsMemory({top: this.state.positions.player.top, left: this.state.positions.player.left})
    return (
      <div className="grid">
        { potentialMemory }
        <Player
            position={this.state.positions.player}
            handlePlayerMovement={this.handlePlayerMovement} />
        { this.renderFlatmates() }
      </div>
    );
  }
}

class Flatmate extends React.Component {
   constructor(props) {
    super(props);
    }

    render(){
      let flatmateStyle = {
        top: (this.props.top * GRID_SIZE) + 'px',
        left: (this.props.left * GRID_SIZE) + 'px',
        backgroundImage: `url(${this.props.image})`
      }


  
      let bubbleStyle = {
        top: ((this.props.top - 8) * GRID_SIZE) + 'px',
        left: ((this.props.left - 4) * GRID_SIZE) + 'px',
        display: `${this.props.is_interactable == false ? "none" : "flex" }`
      }
      let randomNum = Math.floor(Math.random() * this.props.quotes.length)
      let quote = this.props.quotes[randomNum]
      let flatmateClasses = "flatmate"
      if(this.props.is_interactable == true){
        flatmateClasses = "flatmate interactable"
      }
      return(
        <div>
          <div
            className="flatmate-speech-bubble"
            style={bubbleStyle}
          >
          <div className="bubble-text">
            { quote }
          </div>
          </div>
          <div
            className={flatmateClasses}
            style={flatmateStyle}
          >
        </div>
      </div>
      );
    }

}


class Player extends React.Component {
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