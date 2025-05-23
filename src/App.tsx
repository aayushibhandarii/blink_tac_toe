import { useState } from 'react'
import './App.css'
import PlayerDetails from './components/playerDetails'
import Tictactoe from './components/tictactoe';

function App() {
  const [categorySelected,setCategorySelected] = useState<string[]>([]); 
  return (
    <>
      {
        categorySelected.length <2?
        ( categorySelected.length==0?
          <PlayerDetails player='1' setCategorySelected={setCategorySelected}/>:
          <PlayerDetails player='2' setCategorySelected={setCategorySelected}/>
        ) :
        (
          <Tictactoe categorySelected={categorySelected}/>
        )
      }
    </>
  )
}

export default App
