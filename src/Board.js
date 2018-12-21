import React, { Component } from 'react'
// import { Button } from 'react-bootstrap'

class Board extends Component {
  constructor(props){
    super(props)
    this.state = {
      count: 0,
      playerOne: "",
      playerTwo: "",
      spaces: ["", "", "", "", "", "", "", "", ""],
      message: ""
    }
  }

  // teamSelect(){
  //   //create input box to select team
  // }
  //create a method to take turns from player: x / player: o

//method that measures click to determines who's turn is it.
  teamSelect = (e) => {
    let {playerOne, playerTwo, count} = this.state
    //Set up what input was changed/typed in
    let newPlayerEntry = e.target.id
    //Get the value entered through input
    let newPlayerSymbol = e.target.value
    console.log(count);
    // console.log(newPlayerEntry);
    // console.log(newPlayerSymbol);
    // playerTwo = ""
    // console.log(player, side);
    //Update state with new value
    this.setState({[newPlayerEntry]: newPlayerSymbol})

  }

  //method for userClick
  userClick(e) {
    let { spaces, count, playerOne, playerTwo, message} = this.state
    console.log(count);
    console.log(playerOne);
    console.log(playerTwo);

      if(playerOne != "" && (count+2)% 2 === 0 && spaces[e.target.id] === "") {
          spaces[e.target.id] = playerOne
          count++
      } else if (playerTwo != "" && (count+2)%2 === 1 && spaces[e.target.id] === "") {
          spaces[e.target.id] = playerTwo
          count++
      }
  //centralized winning condition
      var winningConditions = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [2,4,6], [0,4,8]]

      let win= winningConditions.filter((combo,index,array) => {
      var [a,b,c] = combo
      if(spaces [a] && spaces[a]=== playerOne && spaces[b]===playerOne && spaces[c]=== playerOne){
        message = `${playerOne} is the Winner!`
      } else if(spaces [a] && spaces[a]=== playerTwo && spaces[b]=== playerTwo && spaces[c]=== playerTwo){
        message = `${playerTwo} is the Winner!`
      }
      else if(count === 9){
        message = "It's a draw!"
      }
      })
      this.setState({count:count, spaces:spaces, message:message})

    }

  render() {
    console.log(this.state);
    let { count,message, playerOne, playerTwo } = this.state
    // console.log(playerOne);
    let squares = this.state.spaces.map((val, index) => {
    return  (
      <div className = "grid-item" key={index} id={index} onClick={this.userClick.bind(this)}>{val}</div> )


  })
  return (
    <div>
      <div className="message"> {message}</div>
      <div className="grid-container"> {squares} </div>
      <div className="selector"> Select a Player</div>
      <div className= "players">
      <label>Player One:
        <input className="team" type="text" id='playerOne' value={playerOne} onChange={this.teamSelect}/>
      </label>
      <label> Player Two:
        <input className="team" type="text" id='playerTwo' value={playerTwo} onChange={this.teamSelect}/>
      </label>
      </div>

      <form onSubmit= {this.teamSelect}>
        <button className="Button" type = "submit" > Restart  </button>
      </form>
    </div>
  );
}
}
export default Board
