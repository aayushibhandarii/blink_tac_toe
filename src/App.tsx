import { useState } from 'react'
import './App.css'
import PlayerDetails from './components/playerDetails'

function App() {
  const [categorySelected,setCategorySelected] = useState([]); 
  console.log(categorySelected);
  return (
    <>
      {
        categorySelected.length ==0?
        <PlayerDetails player='1' setCategorySelected={setCategorySelected}/>:
        <PlayerDetails player='2' setCategorySelected={setCategorySelected}/>
      }
    </>
  )
}

export default App
