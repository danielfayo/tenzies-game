import { useState, useEffect } from 'react';
import Die from './components/Die';
import {nanoid} from "nanoid"
// import Confetti from "react-canvas-confetti"

function App() {
  const [dice, setDIce] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  function generateNewDie() {
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
  }

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
    setTenzies(true)
    // console.log("You won!")
    }
  }, [dice])
  
  function allNewDice(){
    let newArray = []
    for (let i = 0; i < 10; i++){
      newArray.push(generateNewDie())
    }
    return newArray;
  }

  function holdDie(die){
    const newArr = dice.map(each => each.id === die.id ? {...each, isHeld : !die.isHeld} : each);
    setDIce(newArr);
  }

  const diceElements = dice.map(die => 
    <Die value={die.value} 
      key={die.id} 
      isHeld={die.isHeld} 
      onClick = {()=>holdDie(die)}
    />)

  function handleRoll(){
    let newArr = dice.map(die => die.isHeld === true ? die : generateNewDie())
    // setDIce(allNewDice())
    setDIce(newArr)
    allNewDice()
  }

  
  return(
    <div>
      <main>
      {/* {tenzies && <Confetti />} */}
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='die-wrapper'>
          {diceElements}
        </div>
        <button className='roll-button' onClick={handleRoll}>{tenzies ? 'New Game' : 'Roll'}</button>
      </main>
    </div>
  )
}

export default App;
